---
layout: doc
title: Public API endpoints
category: "Meta"
api_type: general
description: Every route of the Bot Creator public API /v1 with its method, required scope and a short description. Premium only.
permalink: /docs/public-api-reference/
locale: en
translation_key: doc-public-api-reference
---

Every route of the public API. Read the [Public API guide]({{ '/docs/public-api/' | relative_url }}) first for authentication, scopes, limits and errors. The machine-readable contract is `https://api.bot-creator.fr/v1/openapi.json` (OpenAPI 3.1).

Base URL: `https://api.bot-creator.fr`. Send `Authorization: Bearer bcm_k_...` on every route except the contract. `{botId}` must be the bot the key belongs to; `GET /v1/bot` is a shortcut that needs no id.

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

## Contract

| Route | Scope | Description |
|---|---|---|
| `GET /v1/openapi.json` | none | OpenAPI 3.1 contract |

## Response conventions

- Lists: `{ "items": [...], "next_cursor": "..." | null }`.
- Writes return the saved object, a `revision`, and `runner_synced` (with `runner_sync_reason` and `next_step` when it is `false`). Commands also return `compile.warnings`, `discord_publish` and `discord_error` when Discord was involved.
- Errors: `{ "code", "message", "details", "request_id" }`.
- Rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`; on `429`, `Retry-After` and `X-RateLimit-Reset`.
