---
layout: doc
title: "Discord publication"
category: "API"
api_type: general
description: "Publish a command to Discord, check its state and take it back off Discord with the Bot Creator public API."
permalink: /docs/api-publication/
locale: en
translation_key: doc-api-publication
---

Publishing is a separate step from creating a command, and needs the `publish:commands` scope. Asking for a registration (`global` or `guilds`) in the body of a command write needs the same scope.

Base URL `https://api.bot-creator.fr/v1/bots/{botId}`. Authenticate with `Authorization: Bearer bcm_k_...`. See the [Public API guide]({{ '/docs/public-api/' | relative_url }}) for keys, scopes and limits.

## Publication object

| Field | Type | Description |
|---|---|---|
| `command_id` | string | The command |
| `registration` | string | `none`, `global` or `guilds` |
| `guild_ids` | string[] | Discord server ids (17 to 20 digits) when `guilds` |
| `state` | string | `local`, `published`, `out_of_sync`, `unpublished`, `error` or `unknown` |
| `publications` | object[] | Per-server details |

**Example publication object**

```json
{
  "command_id": "hello",
  "registration": "guilds",
  "guild_ids": ["123456789012345678"],
  "registration_explicit": true,
  "state": "published",
  "publications": []
}
```

## Get the publication

`GET /commands/{commandId}/publication` · scope `read:bots`

## Publish

`POST /commands/{commandId}/publication` · scope `publish:commands`

```bash
curl -X POST "$BASE/commands/hello/publication" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"registration":"guilds","guild_ids":["123456789012345678"]}'
```

For every server use `{"registration":"global"}`. If Discord refuses, the API answers `502 discord_error`, puts the reason in `details` and leaves the state unchanged.

**Example error**

```json
{
  "code": "discord_error",
  "message": "Discord refused the publication.",
  "details": { "reason": "..." },
  "request_id": "req_01HZX3"
}
```

## Remove from Discord

`DELETE /commands/{commandId}/publication` · scope `publish:commands`

Removes the command from Discord and keeps it in Bot Creator.
