#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MMKClient } from './mmk.js';
import { formatError, formatResponse } from './utils.js';
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

// Define schema for server version check
const ServerVersionSchema = z.object({
    method: z.literal('tools/call'),
    params: z.object({
        name: z.literal('magic_meal_kits_server_version'),
        input: z.object({}).optional()
    })
});

// Handle tool call for server version check
server.setRequestHandler(ServerVersionSchema, async () => {
    try {
        const versionInfo = await mmk.getServerVersion();
        
        return {
            content: [
                { 
                    type: "text", 
                    text: `Magic Meal Kits server version: ${versionInfo.version}` 
                }
            ],
            isError: false
        };
    } catch (error) {
        console.error('Error getting server version:', error);
        return {
            content: [
                { 
                    type: "text", 
                    text: `Error getting server version: ${error instanceof Error ? error.message : String(error)}` 
                }
            ],
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
                name: 'magic_meal_kits_server_version',
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
