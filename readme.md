# Magic Meal Kits MCP Server

A Model Context Protocol server that enables Notion block duplication for Magic Meal Kits to be utilized as a tool by AI assistants. This integration allows AI systems to duplicate blocks in Notion through your Magic Meal Kits API.

## How It Works

The MCP server:

- Connects to your Magic Meal Kits API and Notion workspace
- Enables AI assistants to duplicate Notion blocks by providing parent and source block IDs
- Returns structured responses with detailed information about the duplicated blocks
- Follows secure authentication practices using API keys and Notion authentication tokens

## Benefits

- Duplicate Notion blocks programmatically through natural language requests
- Maintain a clean separation between your API backend and AI integration
- Create seamless workflows between Magic Meal Kits and Notion

## Usage with Claude Desktop

### Prerequisites

- NodeJS
- MCP Client (like Claude Desktop App)
- Magic Meal Kits API Key
- Notion workspace with appropriate permissions

### Installation

#### Global Installation (Optional)

You can install the package globally using npm:

```bash
npm install -g mmk-mcp
```

Current version: 1.0.6

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
                "MMK_API_BASE_URL": "<your-api-base-url>",
                "NOTION_SPACE_ID": "<your-notion-space-id>",
                "NOTION_USER_ID": "<your-notion-user-id>",
                "NOTION_TOKEN": "<your-notion-token>"
            }
        }
    }
}
```

- `MMK_API_KEY` - Your Magic Meal Kits API key
- `MMK_API_BASE_URL` - The base URL for your Magic Meal Kits API
- `NOTION_SPACE_ID` - Your Notion workspace ID (required for Notion integration)
- `NOTION_USER_ID` - Your Notion user ID (required for Notion integration)
- `NOTION_TOKEN` - Your Notion token from the token_v2 cookie (required for Notion integration)

### Development

1. Clone this repository from https://github.com/pureugong/mmk-mcp
2. Create a `.env` file based on `.env.example`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run the server: `npm start`

## Available Tools

| Tool Name | Description | Parameters |
|-----------|-------------|------------|
| `mcp_mmk_notion_duplicate` | Duplicate a Notion block | `parent_id`: ID of the parent block where the duplicate will be placed<br>`source_id`: ID of the block to duplicate |
| `mcp_mmk_server_version` | Check the Magic Meal Kits server version | No parameters required |

## Getting Notion Authentication

To find your Notion authentication values:

1. **Notion Space ID and User ID**: These can be found in the URL when navigating to your Notion workspace settings.
2. **Notion Token**: This can be accessed from your browser cookies after logging into Notion:
   - Open your browser's developer tools (F12)
   - Go to the Application/Storage tab
   - Look for the `token_v2` cookie under the notion.so domain

If you need assistance with finding any of these values, please feel free to ask for help.