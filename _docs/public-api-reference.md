---
layout: doc
title: Public API endpoints
category: "Meta"
api_type: general
description: Every route of the Bot Creator public API /v1 with its method, required scope and a short description. Premium only.
permalink: /docs/public-api-reference/
locale: en
translation_key: doc-public-api-reference
premium: true
---

Every route of the public API. Read the [Public API guide]({{ '/docs/public-api/' | relative_url }}) first for authentication, scopes, limits and errors. The machine-readable contract is `https://api.bot-creator.fr/v1/openapi.json` (OpenAPI 3.1).

Base URL: `https://api.bot-creator.fr`. Send `Authorization: Bearer bcm_k_...` on every `/v1` route except the open ones. `{botId}` must be the bot the key belongs to; `GET /v1/bot` is a shortcut that needs no id.

## Bot

| Route | Scope | Description |
|---|---|---|
| `GET /v1/bot` | `read:bots` | The bot of the key |
| `GET /v1/bots/{botId}` | `read:bots` | Name, engine, counts and non-secret settings (never the Discord token) |

## Commands

| Route | Scope | Description |
|---|---|---|
| `GET /v1/bots/{botId}/commands` | `read:bots` | List commands. Query: `limit` (1 to 100), `cursor`, `state` |
| `POST /v1/bots/{botId}/commands` | `write:commands` | Create a command. Body `{ "command": {...} }`. `409 already_exists` if the id is taken |
| `GET /v1/bots/{botId}/commands/{commandId}` | `read:bots` | Read a command |
| `PUT /v1/bots/{botId}/commands/{commandId}` | `write:commands` | Create or replace |
| `PATCH /v1/bots/{botId}/commands/{commandId}` | `write:commands` | JSON merge patch (RFC 7386). The id cannot change |
| `DELETE /v1/bots/{botId}/commands/{commandId}` | `write:commands` | Delete for good, history included. Also removes it from Discord if published |
| `GET /v1/bots/{botId}/commands/{commandId}/history` | `read:bots` | Last 5 versions |
| `POST /v1/bots/{botId}/commands/{commandId}/rollback/{historyId}` | `write:commands` | Restore a version |

## Preview

| Route | Scope | Description |
|---|---|---|
| `POST /v1/bots/{botId}/preview` | `read:bots` | Run a BDFD script in the sandbox with sample values and get the messages it would send (content, embeds, components). Body `{ "script" or "command_id", "scenario"? }`. Nothing is sent to Discord or written. `429 sandbox_busy`, `503 sandbox_unavailable` |
| `POST /v1/preview` | none (no key) | Same preview with an example context only: empty database, sample author, channel and server. Body `{ "script", "scenario"? }`. Limited to 20 per minute per IP address, script up to 20,000 characters. Meant for documentation and playgrounds |
| `GET /v1/examples/{page}` | none (no key) | The BDFD examples of a documentation page (slug as in `/docs/{slug}.json`) with the message each one produces, computed in advance by the real engine. Nothing is executed; cached for one hour |

### Preview scenario

`scenario` is optional and every field in it is optional. Anything the scenario does not give is filled with sample data (members, roles, channels and web answers that do not exist on Discord).

| Field | Type | Description |
|---|---|---|
| `options` | object | Option name to value |
| `optionTypes` | object | Option name to `string`, `integer`, `number`, `boolean`, `user`, `channel`, `role` or `mentionable`, so the value is converted like on Discord |
| `variables` | object | A name with a dot (`member.isAdmin`) is a runtime variable; a plain name (`balance`) is a stored member variable |
| `permissions` | any | Permissions of the member running the command, passed to the engine as given |
| `memberRoles` | array of strings | Role IDs of the member |
| `channelParentId` | string | ID of the category of the channel |

```json
{
  "script": "$title[Profile]\n$description[$getUserVar[balance] coins]",
  "scenario": {
    "options": { "member": "123456789012345678" },
    "optionTypes": { "member": "user" },
    "variables": { "balance": "250", "member.isAdmin": "true" },
    "memberRoles": ["70", "71"]
  }
}
```

The answer is `{ ok, error, diagnostics, messages, effects, simulated }`; each message has a `payload` with `content`, `embeds` and `components`. Errors: `429 rate_limited` (public route, 20 per minute per IP address), `429 sandbox_busy`, `503 sandbox_unavailable`, `502 sandbox_failed`.

## Discord publication

| Route | Scope | Description |
|---|---|---|
| `GET /v1/bots/{botId}/commands/{commandId}/publication` | `read:bots` | Registration (`none`, `global`, `guilds`), state and per-server publications |
| `POST /v1/bots/{botId}/commands/{commandId}/publication` | `publish:commands` | Publish. Body `{ "registration": "global" }` or `{ "registration": "guilds", "guild_ids": ["..."] }` |
| `DELETE /v1/bots/{botId}/commands/{commandId}/publication` | `publish:commands` | Remove from Discord, keep in Bot Creator |

`state` is `local`, `published`, `out_of_sync`, `unpublished`, `error` or `unknown`. `guild_ids` are Discord snowflakes of 17 to 20 digits.

## Workflows

| Route | Scope | Description |
|---|---|---|
| `GET /v1/bots/{botId}/workflows` | `read:bots` | List workflows (paginated) |
| `GET /v1/bots/{botId}/workflows/{name}` | `read:bots` | Read a workflow |
| `PUT /v1/bots/{botId}/workflows/{name}` | `write:workflows` | Create or replace. Body `{ "workflow": {...} }` |
| `DELETE /v1/bots/{botId}/workflows/{name}` | `write:workflows` | Delete |

## Variables

`scope` is `global`, `user`, `guild`, `channel` or `guildMember`.

| Route | Scope | Description |
|---|---|---|
| `GET /v1/bots/{botId}/variables` | `read:bots` | Global values and variable definitions (secret-looking names are masked) |
| `GET /v1/bots/{botId}/variables/{scope}/{key}` | `read:bots` | With `scope_id` (and `scope_aux_id`): one value, `{ scope, key, found, value }`. Without: the stored values, paginated |
| `PUT /v1/bots/{botId}/variables/{scope}/{key}` | `write:settings` | Body `{ "value": ..., "scope_id"?, "scope_aux_id"? }`. Creates the definition if missing |
| `DELETE /v1/bots/{botId}/variables/{scope}/{key}` | `write:settings` | Delete a value, keep the definition |

## Stored files

The files the bot keeps with `$fileUpload` and `bc.files`. The path of a file goes in the `path` query parameter. Details on [Stored files]({{ '/docs/api-files/' | relative_url }}).

| Route | Scope | Description |
|---|---|---|
| `GET /v1/bots/{botId}/files` | `read:files` | List files. Query: `prefix`, `limit` (1 to 100), `cursor` |
| `GET /v1/bots/{botId}/files/info?path=` | `read:files` | Size, type and last update of one file |
| `GET /v1/bots/{botId}/files/content?path=` | `read:files` | Download the raw content |
| `PUT /v1/bots/{botId}/files/content?path=` | `write:files` | Upload or replace. The body is the raw content (25 MiB at most) |
| `DELETE /v1/bots/{botId}/files?path=` | `write:files` | Delete, idempotent |
| `POST /v1/bots/{botId}/files/link` | `read:files` | Temporary public link. Body `{ "path", "ttl_seconds"? }` |

## Database

Collections and documents in three kinds of space: Discord servers (`/guilds/{spaceId}`), Discord users (`/users/{spaceId}`) and the bot itself (`/bot-space/{spaceId}`). Every `.../{space}` prefix below stands for `/v1/bots/{botId}/guilds/{spaceId}`, `/v1/bots/{botId}/users/{spaceId}` or `/v1/bots/{botId}/bot-space/{spaceId}`. Details on [Database overview]({{ '/docs/api-database/' | relative_url }}).

| Route | Scope | Description |
|---|---|---|
| `GET /v1/bots/{botId}/collections` | `read:data` | List collections |
| `GET .../{space}/collections/{collection}/docs` | `read:data` | List documents |
| `GET .../{space}/collections/{collection}/docs/{docId}` | `read:data` | Read a document |
| `PUT .../{space}/collections/{collection}/docs/{docId}` | `write:data` | Create or replace a document |
| `PATCH .../{space}/collections/{collection}/docs/{docId}` | `write:data` | Merge fields into a document |
| `DELETE .../{space}/collections/{collection}/docs/{docId}` | `write:data` | Delete a document |
| `POST .../{space}/collections/{collection}/docs/{docId}/ops` | `write:data` | Atomic operations (`incr`, `push`, `pull`, `addToSet`, compare-and-set) |
| `POST .../{space}/collections/{collection}/query` | `read:data` | Query with `where`, `sort` and paging |
| `POST .../{space}/collections/{collection}/aggregate` | `read:data` | Aggregates |
| `PUT .../{space}/collections/{collection}` | `write:data` | Collection settings (indexes, time to live) |
| `POST .../{space}/batch` | `write:data` | Up to 20 operations, all or nothing |
| `GET /v1/bots/{botId}/data/usage` | `read:data` | Space used and limits |
| `GET /v1/bots/{botId}/data/export` | `read:data` | Export everything as gzipped NDJSON |
| `DELETE /v1/bots/{botId}/subjects/{userId}` | `write:data` | Erase the data of one person |

## Open routes (no key)

These routes need no API key. They are described on [Open endpoints]({{ '/docs/public-endpoints/' | relative_url }}).

| Route | Description |
|---|---|
| `GET /v1/openapi.json` | OpenAPI 3.1 contract |
| `POST /v1/preview` | Public preview with an example context. See [Preview](#preview) |
| `GET /v1/examples/{page}` | Documentation examples with their results. See [Preview](#preview) |
| `GET /docs/index.json` | Index of the documentation pages |
| `GET /docs/{slug}.json` | One documentation page as JSON |
| `GET`, `POST /mcp/docs` | Read-only documentation MCP server, see [MCP servers]({{ '/docs/mcp/' | relative_url }}) |
| `GET /premiums-list` | Discord IDs of Premium accounts |
| `GET /public/bots/{botId}` | Public status page of a bot |
| `GET /public/bot-files/{token}` | A temporary shared file link |
| `GET /healthz` | Health check |

### Premium list

`GET /premiums-list` returns a JSON array of the Discord IDs (strings) of accounts with an active Premium plan, and nothing else. Only accounts signed in with Discord appear. The answer is cached for 5 minutes (`Cache-Control: public, max-age=300`), so a change can take a few minutes to show. Limited to 60 requests per minute per IP address (`429` beyond that). Example: `["123456789012345678","234567890123456789"]`.

## MCP and OAuth

Not part of `/v1`, so an API key does not work here. See [MCP servers]({{ '/docs/mcp/' | relative_url }}).

| Route | Description |
|---|---|
| `POST /mcp/user` | MCP server for your bots (OAuth token, Premium) |
| `GET /.well-known/oauth-protected-resource`, `GET /.well-known/oauth-authorization-server` | OAuth discovery |
| `POST /oauth/register`, `GET /oauth/authorize`, `POST /oauth/token`, `POST /oauth/revoke` | OAuth 2.1 with PKCE `S256` |
| `GET /account/connections` | Assistants connected to your account (account session) |

## Routes for the Bot Creator apps

The apps and the Studio talk to the Manager with an account session under `/auth`, `/gateway`, `/api/v2`, `/storage`, `/containers` and `/billing`. They follow the needs of the apps, they are not a stable contract and they are not meant for third-party code: use `/v1` instead.

## Contract

| Route | Scope | Description |
|---|---|---|
| `GET /v1/openapi.json` | none | OpenAPI 3.1 contract |

## Response conventions

- Lists: `{ "items": [...], "next_cursor": "..." | null }`.
- Writes return the saved object, a `revision`, and `runner_synced` (with `runner_sync_reason` and `next_step` when it is `false`). Commands also return `compile.warnings`, `discord_publish` and `discord_error` when Discord was involved.
- Errors: `{ "code", "message", "details", "request_id" }`.
- Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`; on `429`, `Retry-After` and `X-RateLimit-Reset`.
