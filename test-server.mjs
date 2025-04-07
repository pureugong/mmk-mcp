#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = resolve(__dirname, './build/src/index.js');

console.log(`Starting MCP server from ${serverPath}`);

// Spawn the server process
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

server.stdout.on('data', (data) => {
  console.log(`Server stdout: ${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`Server stderr: ${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});

// Give the server a moment to initialize
setTimeout(() => {
  console.log('Sending tools/list request...');
  
  // Send a tools/list request
  const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  };
  
  server.stdin.write(JSON.stringify(request) + '\n');
  
  // Wait for response and then exit
  setTimeout(() => {
    console.log('Test completed, stopping server...');
    server.kill();
    process.exit(0);
  }, 2000);
}, 1000); 