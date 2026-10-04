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
| `get_schema_manifest` | Tool | Grammaire et dictionnaire de types compacts (`{ desc, params }`). Mode par défaut `'blocks'` (~3k tokens) pour l'exhaustivité des actions natives. Supporte aussi `'bdfd'`, `'javascript'`, `'types'` (types imbriqués : `Embed`, `Component`, `Condition`, `Action`…), `'all'` et filtre `category`. |
| `plan_solution` | Tool | Point de départ pour une demande de commande : en un appel déterministe (sans LLM), renvoie les meilleures fonctions BDFD/Blocks avec signatures, les pièges applicables, un squelette validé si une recette correspond, et une décision `auto` / `review` / `ask_user` (confiance et marge). Remplace les boucles `search_docs` + `get_doc`. |
| `list_actions` | Tool | Liste légère des noms d'actions Blocks (nom, catégorie, description), filtrable par `category`. |
| `validate_actions` | Tool | Valide un tableau `[{ type, payload }]` : actions inconnues (avec suggestion), paramètres requis, types/enums, embeds, composants, conditions et `thenActions` imbriqués. Renvoie `{ valid, errors[{path,message}], warnings }`. |
| `search_docs` | Tool | Recherche dans la documentation. Inclut directement les signatures de paramètres typés (`params`, `syntax`, `description`), statuts de compatibilité et slugs. |
| `get_doc` | Tool | Renvoie par défaut la définition de type compacte (`full_markdown: false`) pour économiser les tokens et éviter les hallucinations. Définir `full_markdown: true` pour le guide Markdown complet. |
| `list_posts` | Tool | Liste les articles de blog, filtrables par langue (`en` / `fr`). |
| `search_posts` | Tool | Recherche parmi les articles de blog par titre ou description. |
| `get_post` | Tool | Récupère le Markdown brut d'un article de blog par son slug. |
| `command_authoring_rules` | Prompt | Règles de cycle d'interaction, séparation des portées de variables, exemples few-shot et pièges LLM. |
| `production_ticket_workflow` | Prompt | Modèle complet de système de tickets Discord en production (salons privés, permissions et bouton interactif). |

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
