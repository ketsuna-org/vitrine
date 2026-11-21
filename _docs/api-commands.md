---
layout: doc
title: "Commands resource"
category: "API"
api_type: general
description: "Create, read, edit, archive and restore commands with the Bot Creator public API, with example objects and responses."
permalink: /docs/api-commands/
locale: en
translation_key: doc-api-commands
---

Manage the commands of your bot. A command created through the API is stored in Bot Creator and is **not on Discord** until you [publish it]({{ '/docs/api-publication/' | relative_url }}).

Base URL `https://api.bot-creator.fr/v1/bots/{botId}`. Authenticate with `Authorization: Bearer bcm_k_...`. See the [Public API guide]({{ '/docs/public-api/' | relative_url }}) for keys, scopes and limits.

## Command object

The command document has the same format as the Studio. The most reliable way to learn it is to `GET` a command you built in the Studio. The fields below are the common ones.

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable id. Generated when omitted on create |
| `name` | string | Command name |
| `description` | string | Description shown on Discord |
| `data.discord.registration` | string | `none`, `global` or `guilds` |
| `data.discord.guildIds` | string[] | Discord server ids when `registration` is `guilds` |

**Example command object**

```json
{
  "id": "hello",
  "name": "hello",
  "response": "Hello!"
}
```

**Example command summary** (items of the list route)

```json
{
  "id": "hello",
  "name": "hello",
  "trigger": "hello",
  "type": "chatInput",
  "execution_mode": "bdfd_script",
  "option_count": 0,
  "node_count": 0,
  "content_hash": "3f1a9c"
}
```

## List commands

`GET /commands` · scope `read:bots`

Query: `limit` (1 to 100, 50 by default), `cursor`, `state` (`local`, `published`, `out_of_sync`, `unpublished`, `error`, `unknown`).

**Example response**

```json
{
  "items": [ { "id": "hello", "name": "hello", "execution_mode": "bdfd_script" } ],
  "next_cursor": null,
  "revision": "r_8f2c1a"
}
```

## Get a command

`GET /commands/{commandId}` · scope `read:bots`

**Example response**

```json
{
  "bot_id": "b_9c2e41",
  "revision": "r_8f2c1a",
  "command": { "id": "hello", "name": "hello", "response": "Hello!" }
}
```

## Create a command

`POST /commands` · scope `write:commands` · body `{ "command": {...} }`

`409 already_exists` if the id is taken. Use `PUT /commands/{commandId}` to create or replace.

```bash
curl -X POST "$BASE/commands" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"command":{"id":"hello","name":"hello","response":"Hello!"}}'
```

**Example response** (`201 Created`)

```json
{
  "revision": "r_8f2c1b",
  "command": { "id": "hello", "name": "hello", "response": "Hello!" },
  "history_id": "h_41",
  "runner_synced": true,
  "warnings": []
}
```

When `runner_synced` is `false`, the change is saved but the running bot did not receive it. Read `runner_sync_reason` and `next_step`. The server compiles the command on write: errors answer `422 validation_failed` and nothing is saved, warnings come back in `compile.warnings`.

## Edit part of a command

`PATCH /commands/{commandId}` · scope `write:commands`

JSON merge patch (RFC 7386): sent fields replace existing ones, `null` removes a field, arrays are replaced as a whole. The id cannot change.

```bash
curl -X PATCH "$BASE/commands/hello" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"command":{"response":"Hello, world!"}}'
```

## Archive a command

`DELETE /commands/{commandId}` · scope `write:commands`

Archives the command: it is not erased. It is removed from Discord if it was published and from the running bot, its last content is kept, and the owner can restore it from the Trash in the app or the Studio.

**Example response**

```json
{ "revision": "r_8f2c1c", "deleted": true, "runner_synced": true }
```

## History and rollback

Each command keeps its last 5 versions.

`GET /commands/{commandId}/history` · scope `read:bots`

**Example version object**

```json
{
  "history_id": "h_41",
  "created_at": "2026-11-19T20:12:59Z",
  "size_bytes": 412,
  "content_hash": "3f1a9c",
  "revision": "r_8f2c1a"
}
```

`POST /commands/{commandId}/rollback/{historyId}` · scope `write:commands` restores a version.
