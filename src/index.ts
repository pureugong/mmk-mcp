#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MMKClient, NotionClient } from './mmk.js';
import { formatError, formatResponse, validateRequiredFields } from './utils.js';
import { z } from 'zod';

const server = new Server({
    name: 'Magic Meal Kits',
    version: '1.0.0'
}, {
    capabilities: {
        tools: {}
    }
});

if (!process.env.MMK_API_KEY) {
    throw new Error('MMK_API_KEY is not set');
}

if (!process.env.MMK_API_BASE_URL) {
    throw new Error('MMK_API_BASE_URL is not set');
}

const mmk = new MMKClient(process.env.MMK_API_KEY, process.env.MMK_API_BASE_URL);

if (process.env.NOTION_SPACE_ID && process.env.NOTION_USER_ID && process.env.NOTION_TOKEN) {
    const notion = new NotionClient(
        process.env.NOTION_SPACE_ID,
        process.env.NOTION_USER_ID,
        process.env.NOTION_TOKEN,
        mmk
    );
    mmk.setNotion(notion);
}

// Define schema for Notion duplicate
const NotionDuplicateSchema = z.object({
    method: z.literal('tools/call'),
    params: z.object({
        name: z.literal('mcp_mmk_notion_duplicate'),
        input: z.object({
            parent_id: z.string().describe('ID of the parent block where the duplicate will be placed'),
            source_id: z.string().describe('ID of the block to duplicate')
        })
    })
});

// Handle tool call for Notion duplicate
server.setRequestHandler(NotionDuplicateSchema, async (request) => {
    try {
        if (!mmk.notion) {
            return {
                result: formatError('Notion client is not configured. Please set NOTION_SPACE_ID, NOTION_USER_ID, and NOTION_TOKEN environment variables.', 400),
                isError: true
            };
        }
        
        const { parent_id, source_id } = request.params.input;
        
        // Validate required fields
        const validationError = validateRequiredFields(request.params.input, ['parent_id', 'source_id']);
        if (validationError) {
            return {
                result: formatError(validationError, 400),
                isError: true
            };
        }
        
        const result = await mmk.notion.duplicate(parent_id, source_id);
        
        return {
            result: formatResponse({
                message: result.message,
                parentId: result.parentId,
                sourceId: result.sourceId,
                newBlockId: result.newBlockId
            }),
            isError: false
        };
    } catch (error) {
        console.error('Error duplicating Notion block:', error);
        return {
            result: formatError(error instanceof Error ? error : String(error)),
            isError: true
        };
    }
});

// Define schema for server version check
const ServerVersionSchema = z.object({
    method: z.literal('tools/call'),
    params: z.object({
        name: z.literal('mcp_mmk_server_version'),
        input: z.object({}).optional()
    })
});

// Handle tool call for server version check
server.setRequestHandler(ServerVersionSchema, async () => {
    try {
        const versionInfo = await mmk.getServerVersion();
        
        return {
            result: formatResponse({
                version: versionInfo.version,
                message: `Magic Meal Kits server version: ${versionInfo.version}`
            }),
            isError: false
        };
    } catch (error) {
        console.error('Error getting server version:', error);
        return {
            result: formatError(error instanceof Error ? error : String(error)),
            isError: true
        };
    }
});

// Define schema for tools/list
const ListToolsSchema = z.object({
    method: z.literal('tools/list')
});

// Register tool list endpoint
server.setRequestHandler(ListToolsSchema, async () => {
    return {
        tools: [
            {
                name: 'mcp_mmk_notion_duplicate',
                description: 'Duplicate a Notion block',
                inputSchema: {
                    type: 'object',
                    properties: {
                        parent_id: { type: 'string', description: 'ID of the parent block where the duplicate will be placed' },
                        source_id: { type: 'string', description: 'ID of the block to duplicate' }
                    },
                    required: ['parent_id', 'source_id']
                }
            },
            {
                name: 'mcp_mmk_server_version',
                description: 'Check the Magic Meal Kits server version',
                inputSchema: {
                    type: 'object',
                    properties: {},
                    required: []
                }
            }
        ]
    };
});

const transport = new StdioServerTransport();
await server.connect(transport);
