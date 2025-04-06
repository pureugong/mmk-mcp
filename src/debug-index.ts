import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';

const server = new Server({
    name: 'Magic Meal Kits Debug',
    version: '1.0.0'
}, {
    capabilities: {
        tools: {}
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
                name: 'mcp_mmk_debug',
                description: 'Simple debug tool',
                inputSchema: {
                    type: 'object',
                    properties: {},
                    required: []
                }
            }
        ]
    };
});

// Define schema for debug tool
const DebugSchema = z.object({
    method: z.literal('tools/call'),
    params: z.object({
        name: z.literal('mcp_mmk_debug'),
        input: z.object({})
    })
});

// Handle tool call for debug
server.setRequestHandler(DebugSchema, async () => {
    return {
        result: {
            message: 'Debug tool called successfully!'
        },
        isError: false
    };
});

console.log('Starting MCP debug server...');
const transport = new StdioServerTransport();
await server.connect(transport); 