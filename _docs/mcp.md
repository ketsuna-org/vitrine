---
description: Model Context Protocol server for AI-assisted documentation lookup and LLM code generation.
layout: doc
translation_key: docs
category: "Meta"
api_type: general
---

# MCP Server & LLM Integration

Bot Creator exposes its official documentation, execution model contracts, and few-shot authoring prompts through a **Model Context Protocol (MCP)** server. Any MCP-compatible client (opencode, Claude Desktop, Cursor, custom agents) can connect to query function docs, Blocks contracts, and verify execution schemas programmatically.

## Endpoint

```
https://bot-creator.fr/api/mcp
```

- **Protocol:** [MCP 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports)
- **Transport:** Streamable HTTP, stateless mode
- **Auth:** None (read-only public documentation)
- **Capabilities:** `tools`, `prompts`, `resources`

---

## Available Tools & Prompts

| Tool / Prompt | Type | Description |
|---|---|---|
| `search_docs` | Tool | Search documentation by name, slug, category or description. Filter `api_type`: `blocks`, `bdfd`, `javascript`, `general`. Returns mode, compatibility status, and slugs. |
| `get_doc` | Tool | Fetch deployed Markdown contracts and compatibility metadata by slug (e.g. `blocks`, `blocks-dictionary`, `tickets`, `execution-model`, `sendmessage`). |
| `list_posts` | Tool | List blog posts, optionally filtered by `locale` (`en` / `fr`). |
| `search_posts` | Tool | Search blog posts by title or description. |
| `get_post` | Tool | Fetch raw markdown of a blog post by slug. |
| `command_authoring_rules` | Prompt | Crucial interaction lifecycle rules, variable scope separation, few-shot examples, and LLM gotchas. |
| `production_ticket_workflow` | Prompt | Production-ready Discord ticket system template using private channel creation, permission overwrites, and interactive close button. |

---

## Ground Truth Rules & LLM Gotchas

When a language model (LLM) generates code for Bot Creator, it must strictly adhere to the following rules:

### 1. Zero Syntax Hallucinations
- **Strict Rule:** The `$let` bracket syntax **DOES NOT EXIST** in the Bot Creator engine.
- **Temporary Variables (Command Scope):** Use exclusively `$var[name;value]` to write and `$var[name]` to read.
- **Persistent Database Variables:**
  - Global: `$setVar[key;value]` / `$getVar[key]`
  - User: `$setUserVar[key;value]` / `$getUserVar[key]`
  - Guild / Server: `$setServerVar[key;value]` / `$getServerVar[key]`
  - Member: `$setMemberVar[key;value]` / `$getMemberVar[key]`

### 2. Discord Interaction Lifecycle & Slash Commands
- **Automatic Acknowledgment:** The Bot Creator runner automatically handles immediate interaction acknowledgment (`defer`/`acknowledge`).
- **No `$sendMessage` in Slash Commands:** In BDFD, plain text and embed/button declarations outside functions constitute the native interaction reply (`respondWithMessage`). Calling `$sendMessage` in a slash command causes conflicts or double messages.
- **Ephemeral Visibility:** To make a response visible only to the author, add the `$ephemeral` flag in BDFD or `"ephemeral": true` on the `respondWithMessage` block.
- **Targeting Another Channel:** Use `$channelSendMessage[channelID;content]` in BDFD, or the `sendMessage` action with `channelId` in Blocks.

### 3. Robust Private Ticket System
- **Incomplete Legacy Helpers:** The `$newTicket` and `$closeTicket` functions are marked `status: incomplete`. They create public channels without private permission overrides.
- **Production Architecture:** Always use the full explicit workflow:
  1. `createChannel` (attached to a category closed to `@everyone`).
  2. `editChannelPermissions` (with member permission `allow: 68608`).
  3. `sendMessage` (welcome embed in the channel with red button `customId: close_ticket`).
  4. `respondWithMessage` (ephemeral confirmation for the slash command).
  5. Button click interaction handler to close via `removeChannel` / `$deleteChannels`.

### 4. Slash Options
- Options are injected directly via placeholders: `((opts.name))` for the text value, or `((opts.name.id))` for the Snowflake ID (user, channel, role).
- Never generate non-existent functions such as `$slashOption` or `$getOption`.

---

## Verified Few-Shot Examples

### Example 1: Information Slash Command (BDFD)
```bdfd
$title[Server Info]
$description[Welcome to **$serverName**!\nThe server currently has $membersCount members.]
$color[#5865F2]
$ephemeral
```

### Example 2: Information Slash Command (Blocks JSON)
```json
[
  {
    "type": "respondWithMessage",
    "payload": {
      "content": "",
      "ephemeral": true,
      "embeds": [
        {
          "title": "Server Info",
          "description": "Welcome to ((guild.name))!\nThe server currently has ((guild.memberCount)) members.",
          "color": "#5865F2"
        }
      ]
    }
  }
]
```

### Example 3: Temporary vs Persistent Variables (BDFD)
```bdfd
;; 1. Temporary in-memory variable (discarded when script completes)
$var[counter;5]

;; 2. Persistent database variable saved for the user
$setUserVar[points;$sum[$getUserVar[points];$var[counter]]]

;; 3. Ephemeral reply
$ephemeral
You received $var[counter] points! New balance: $getUserVar[points].
```

---

## Command-Line Usage Example (curl)

```bash
# 1. Initialize MCP session
curl -X POST https://bot-creator.fr/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"demo","version":"1.0"}}}'

# 2. Search Blocks documentation
curl -X POST https://bot-creator.fr/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_docs","arguments":{"query":"tickets","api_type":"blocks"}}}'

# 3. Fetch ticket guide
curl -X POST https://bot-creator.fr/api/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"get_doc","arguments":{"slug":"tickets"}}}'
```

## Connecting from OpenCode or Claude Desktop

Add this block to your `opencode.json` (or `claude_desktop_config.json`) configuration file:

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
