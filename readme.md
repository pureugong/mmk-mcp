# Magic Meal Kits MCP Server

[![smithery badge](https://smithery.ai/badge/@pureugong/mmk-mcp)](https://smithery.ai/server/@pureugong/mmk-mcp)

A Model Context Protocol server for Magic Meal Kits that provides server version information as a tool for AI assistants.

## How It Works

The MCP server:

- Connects to your Magic Meal Kits API
- Enables AI assistants to check the Magic Meal Kits server version
- Returns structured responses with version information
- Follows secure authentication practices using API keys

## Benefits

- Check Magic Meal Kits server version programmatically through natural language requests
- Maintain a clean separation between your API backend and AI integration

## Usage with Claude Desktop

### Prerequisites

- NodeJS
- MCP Client (like Claude Desktop App)
- Magic Meal Kits API Key

### Installation

#### Installing via Smithery

To install mmk-mcp for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@pureugong/mmk-mcp):

```bash
npx -y @smithery/cli install @pureugong/mmk-mcp --client claude
```

#### Global Installation (Optional)

You can install the package globally using npm:

```bash
npm install -g mmk-mcp
```

Current version: 1.0.17

#### Claude Desktop Configuration

To use this server with the Claude Desktop app, add the following configuration to the "mcpServers" section of your `claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "magic-meal-kits": {
            "command": "npx",
            "args": ["-y", "mmk-mcp"],
            "env": {
                "MMK_API_KEY": "<your-api-key>",
                "MMK_API_BASE_URL": "<your-api-base-url>"
            }
        }
    }
}
```

- `MMK_API_KEY` - Your Magic Meal Kits API key
- `MMK_API_BASE_URL` - The base URL for your Magic Meal Kits API

### Development

1. Clone this repository from https://github.com/pureugong/mmk-mcp
2. Create a `.env` file based on `.env.example`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run the server: `npm start`

## Available Tools

| Tool Name | Description | Parameters |
|-----------|-------------|------------|
| `magic_meal_kits_server_version` | Check the Magic Meal Kits server version | No parameters required |

## Debugging

### Running the MCP Server Directly

For debugging purposes, you can run the MCP server directly to see console output and any errors:

1. Create a `.env` file in the project root with all required environment variables:

```
MMK_API_KEY=your-api-key
MMK_API_BASE_URL=https://magic-meal-kits-isjxytikta-uw.a.run.app
```

2. Run the server directly:

```bash
# Using the enhanced debug script:
npm run debug

# Or if installed globally:
mmk-mcp
```

3. In another terminal, you can test the server using the MCP Inspector tool:

```bash
# Install the MCP Inspector
npm install -g @modelcontextprotocol/inspector

# Connect to your running MCP server
npx @modelcontextprotocol/inspector stdio -c "node" -a "build/src/index.js"

# Or if you've installed the inspector globally:
mcp-inspector stdio -c "node" -a "build/src/index.js"
```

This will open an interactive inspector where you can test the MCP tools and view responses from the server.

### Troubleshooting

If you encounter issues with the MCP server, here are some common solutions:

#### Server Does Not Support Tools Error

If you see an error like `Error: Server does not support tools (required for tools/call)`, make sure you're using version 1.0.11 or later.

To update to the latest version, run:

```bash
npm install -g mmk-mcp@latest
```
