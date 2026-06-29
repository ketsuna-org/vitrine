---
layout: doc
translation_key: docs
category: "Meta"
---

# MCP Server

Bot Creator exposes its documentation and blog posts through a **Model Context Protocol (MCP)** server. Any MCP-compatible client (opencode, Claude Desktop, Cursor, custom tooling) can connect to query function docs and posts programmatically.

## Endpoint

```
https://bot-creator.fr/api/mcp
```

- **Protocol:** [MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)
- **Transport:** Streamable HTTP, stateless mode
- **Auth:** None (read-only public content)

## Available tools

| Tool | Description |
|------|-------------|
| `search_docs` | Search function docs by name, slug, or category. Returns matches with their slugs. |
| `get_doc` | Fetch the raw markdown of a function doc by slug (e.g. `sendmessage`). |
| `list_posts` | List blog posts, optionally filtered by `locale` (`en` / `fr`). |
| `search_posts` | Search blog posts by title or description. |
| `get_post` | Fetch the raw markdown of a blog post by slug (e.g. `image-creation-canvas-functions-in-bdfd`). |

## Quick example (curl)

```bash
# 1. Initialize the session
curl -X POST https://bot-creator.fr/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"demo","version":"0"}}}'

# 2. Search docs
curl -X POST https://bot-creator.fr/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_docs","arguments":{"query":"canvas"}}}'

# 3. Read a doc
curl -X POST https://bot-creator.fr/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_doc","arguments":{"slug":"sendmessage"}}}'
```

## Connect from opencode

Add this to your project's `opencode.json` (or `~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "vitrine": {
      "type": "remote",
      "url": "https://bot-creator.fr/api/mcp",
      "enabled": true
    }
  }
}
```

Restart opencode and the `vitrine` server will appear with its five tools.

## Discovery

A discovery manifest is published at [`/.well-known/mcp.json`](/.well-known/mcp.json). Note: a ratified standard for MCP server discovery does not exist yet (the [Server Card Working Group](https://modelcontextprotocol.io/community/working-groups/server-card.md) is still chartered), so this file is currently informational.
