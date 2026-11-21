---
layout: doc
title: "MCP servers"
category: "API"
api_type: general
description: "Connect Claude, ChatGPT, Cursor or any MCP client to Bot Creator: the public read-only documentation server and the OAuth server that lets an assistant edit your bots (Premium)."
permalink: /docs/mcp/
locale: en
translation_key: doc-mcp
---

Bot Creator runs two [Model Context Protocol](https://modelcontextprotocol.io) servers over HTTP. Both take JSON-RPC messages with `POST`.

| Server | Address | Account | What it does |
|---|---|---|---|
| Documentation | `https://api.bot-creator.fr/mcp/docs` | None | Read the documentation and plan commands. Nothing about a bot is read or changed |
| Your bots | `https://api.bot-creator.fr/mcp/user` | OAuth, Premium | Read and edit the bots you choose |

## Documentation server

`POST /mcp/docs` needs no key and no sign-in. It is read-only and keeps no session: every request stands alone. Requests are limited to 256 KiB. `GET /mcp/docs` answers `405` with `Allow: POST`.

Add the address to your MCP client, or call it directly:

```bash
curl -X POST https://api.bot-creator.fr/mcp/docs \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

| Tool | Use |
|---|---|
| `docs_plan` | Start here for a command request: the best functions with their signatures, the gotchas that apply and a skeleton, in one call |
| `docs_search` | Keyword search over the documentation |
| `docs_get` | Read one page by slug |
| `docs_manifest` | Typed schema of graph nodes and nested types |
| `docs_actions` | List the graph node types |
| `docs_validate_graph` | Check a workflow graph you generated |

Pass `mode` (the engine of the bot: `bdfd`, `javascript`, `graph`, `types`) so that you get the right pages. The same pages are available as plain JSON, see [Open endpoints]({{ '/docs/public-endpoints/' | relative_url }}).

## Your bots (Premium)

`POST /mcp/user` lets an AI assistant work on your bots: list them, read and write commands and workflows, read logs and variables, start and stop a hosted bot, and manage your Discord server (channels, roles, messages) when you allow it. **It requires an active Premium plan.** A free account can still sign in, but the tool list is empty and every call answers `E_PREMIUM_REQUIRED`; nothing is changed.

Connect it from your assistant:

- Claude, Claude Desktop, ChatGPT: add a custom connector with the address `https://api.bot-creator.fr/mcp/user`.
- Cursor, in `~/.cursor/mcp.json`:

```json
{ "mcpServers": { "bot-creator": { "url": "https://api.bot-creator.fr/mcp/user" } } }
```

The client opens a sign-in page. You sign in with Discord, pick the permissions and **the bots** the assistant may see, and confirm. The assistant never sees the other bots of your account.

### Permissions

| Scope | Allows |
|---|---|
| `read:bots` | See your bots, commands, workflows, settings, logs and status |
| `write:commands` | Create, edit, delete and restore commands |
| `write:workflows` | Create, edit and delete workflows, triggers and webhooks |
| `write:settings` | Change presence, bot name, variables and their values |
| `execute:runtime` | Start and stop the hosted bot, run a trigger |
| `read:discord` | See the structure of your servers and the bot's own messages, never members' messages |
| `write:discord` | Post, edit and delete messages and embeds of the bot |
| `manage:discord` | Create, edit and delete channels, categories, roles, emojis and server settings |
| `moderate:discord` | Kick, ban and time out members |
| `test:discord` | Let the bot test your prefix commands in the test channel you chose |

Each call is checked three times: the permission of the tool, the bot must be one you authorized, and your real rights on the bot. Each authorization allows 600 reads and 60 writes a minute. Every write is logged.

### Manage connections

Signed in to your account, `GET /account/connections` lists the assistants connected to it. You can revoke one (`POST /account/connections/{grantId}/revoke`) or change the bots it can use (`POST /account/connections/{grantId}/bots`). The Studio has a screen for it.

### OAuth endpoints

Standard MCP clients do all of this by themselves. If you write your own client, the server follows OAuth 2.1 with discovery:

| Route | Purpose |
|---|---|
| `GET /.well-known/oauth-protected-resource` | Protected resource metadata (RFC 9728) |
| `GET /.well-known/oauth-authorization-server` | Authorization server metadata (RFC 8414) |
| `POST /oauth/register` | Dynamic client registration (RFC 7591), 10 per hour per IP address |
| `GET /oauth/authorize` | Authorization request. PKCE `S256` is required |
| `POST /oauth/token` | Exchange a code or a refresh token |
| `POST /oauth/revoke` | Revoke a token |

Without a token, `POST /mcp/user` answers `401` with a `WWW-Authenticate: Bearer resource_metadata="..."` header that points to the discovery document. An authorization code lasts 60 seconds, an access token (`bcm_oat_...`) one hour and a refresh token (`bcm_ort_...`) 30 days. A refresh token is used once and replaced; presenting an old one again revokes the whole authorization. An OAuth token only works on `/mcp/user`, and an [API key]({{ '/docs/public-api/' | relative_url }}) only works on `/v1`.
