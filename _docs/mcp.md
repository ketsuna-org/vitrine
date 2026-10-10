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
| `get_schema_manifest` | Tool | Compact typed grammar and schema dictionary (`{ desc, params }`). Default mode `blocks` (about 3k tokens) covers every native Blocks action; `bdfd`, `javascript`, `types` (nested types such as `Embed`, `Component`, `Condition`, `Action`) and `all` are also accepted, plus a `category` filter and a `names` list (up to 20 action names) for full parameter schemas. |
| `plan_solution` | Tool | Starting point for a command request: in one deterministic call (no LLM) it returns the best-fitting BDFD/Blocks/JavaScript functions with signatures, the gotchas that apply, a validated skeleton when a known recipe matches, and a decision (`auto`, `review` or `ask_user`, with confidence and margin). Replaces `search_docs` + `get_doc` loops. |
| `list_actions` | Tool | Light list of the Blocks action names (name, category, description), filterable by `category`. |
| `validate_actions` | Tool | Validates an array of `[{ type, payload }]` actions against the manifest: unknown action names (with suggestions), missing required params, wrong types/enums, unknown params, and nested embeds, components, conditions and `thenActions`. Reports `errors` and `warnings` entries with a `path` and a `message`. |
| `search_docs` | Tool | Searches the documentation. Results include the compact parameter types (`params`, `syntax`, `description`), compatibility status and slugs. Filter with `api_type` (`blocks`, `bdfd`, `javascript`, `general`). |
| `get_doc` | Tool | Returns the compact type definition by default (`full_markdown: false`) to save tokens; set `full_markdown: true` for the full Markdown guide. |
| `list_posts` | Tool | Lists the blog posts, filterable by locale (`en` / `fr`). |
| `search_posts` | Tool | Searches the blog posts by title or description. |
| `get_post` | Tool | Returns the raw Markdown of a blog post by its slug. |
| `command_authoring_rules` | Prompt | Interaction lifecycle rules, variable scope separation (`$var` vs `$setVar`), few-shot examples and LLM gotchas. |
| `production_ticket_workflow` | Prompt | Production-ready Discord ticket system template (private channel creation, permission overwrites and an interactive close button). |

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
- **Automatic Acknowledgment:** The Bot Creator runner acknowledges the interaction before running a BDFD script, unless the source contains `$newModal`, `$callWorkflow`, `$eval` or `$funcCall`.
- **No `$sendMessage` to reply in Slash Commands:** In BDFD, plain text and embed/button declarations constitute the native interaction reply. `$sendMessage` sends an additional, separate channel message, so using it to reply makes the text appear twice.
- **Ephemeral Visibility:** To make a response visible only to the author, add the `$ephemeral` flag in BDFD or `"ephemeral": true` on the `respondWithMessage` block.
- **Targeting Another Channel:** Use `$channelSendMessage[channelID;content;(replyMessageID)]` in BDFD, or the `sendMessage` action with `channelId` in Blocks.

### 3. Private Ticket System
- **`$newTicket`** creates a private text channel named `ticket-<number or author name>` for the command author: `@everyone` is denied, the author and the bot are allowed.
- **`$closeTicket`** deletes the current channel only when its name contains `ticket`. Its page is flagged `status: incomplete`.
- **Custom flow with Blocks:** `createChannel`, `editChannelPermissions` and `removeChannel` actions exist (`68608` is the bitmask of View Channel + Send Messages + Read Message History). The `production_ticket_workflow` prompt describes a complete flow.

### 4. Slash Options
- In BDFD, `$message[name]` returns the value of the slash option `name`.
- In `((...))` placeholders, options are stored as `((opts.name))` for the text value, and `((opts.name.id))` for the ID of a user, channel, role or mentionable option.
- Never generate non-existent functions such as `$slashOption` or `$getOption`.

---

## Verified Few-Shot Examples

### Example 1: Information Slash Command (BDFD)
```bdfd
$title[Server Info]
$description[Welcome to **$serverName**!
The server currently has $membersCount members.]
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
$c[1. Temporary variable, discarded when the script completes]
$var[counter;5]

$c[2. Persistent variable saved for the user]
$setUserVar[lastCounter;$var[counter]]

$c[3. Ephemeral reply]
$ephemeral
Counter: $var[counter]. Saved value: $getUserVar[lastCounter].
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
