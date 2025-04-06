#!/usr/bin/env node
import { config } from 'dotenv';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Load environment variables from .env file
config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = resolve(__dirname, './build/src/index.js');

console.log(`Starting MCP server from ${serverPath}`);
console.log('Environment variables loaded from .env:');
console.log(`- MMK_API_KEY: ${process.env.MMK_API_KEY ? '✓' : '✗'}`);
console.log(`- MMK_API_BASE_URL: ${process.env.MMK_API_BASE_URL ? '✓' : '✗'}`);
console.log(`- NOTION_SPACE_ID: ${process.env.NOTION_SPACE_ID ? '✓' : '✗'}`);
console.log(`- NOTION_USER_ID: ${process.env.NOTION_USER_ID ? '✓' : '✗'}`);
console.log(`- NOTION_TOKEN: ${process.env.NOTION_TOKEN ? '✓' : '✗'}`);

// Spawn the server process
const server = spawn('node', [serverPath], {
  stdio: 'inherit',
  env: process.env
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
}); 