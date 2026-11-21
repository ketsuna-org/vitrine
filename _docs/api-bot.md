---
layout: doc
title: "Bot object"
category: "API"
api_type: general
description: "The bot resource of the Bot Creator public API: fields, routes and example response."
permalink: /docs/api-bot/
locale: en
translation_key: doc-api-bot
---

Read the bot your API key belongs to: its engine, counts and non-secret settings. The Discord bot token is never returned.

Base URL `https://api.bot-creator.fr/v1/bots/{botId}`. Authenticate with `Authorization: Bearer bcm_k_...`. See the [Public API guide]({{ '/docs/public-api/' | relative_url }}) for keys, scopes and limits.

## Bot object

| Field | Type | Description |
|---|---|---|
| `bot_id` | string | Id of the bot |
| `name` | string | Display name |
| `engine` | string | Engine of the bot |
| `revision` | string | Informational revision of the bot configuration |
| `command_count` | integer | Number of commands |
| `workflow_count` | integer | Number of workflows |
| `settings` | object | Non-secret settings |

**Example bot object**

```json
{
  "bot_id": "b_9c2e41",
  "name": "My server bot",
  "engine": "bdfd",
  "revision": "r_8f2c1a",
  "command_count": 12,
  "workflow_count": 3,
  "settings": { "prefix": "!" }
}
```

## Get the bot of the key

`GET /v1/bot` · scope `read:bots`

A shortcut that needs no bot id. `GET /v1/bots/{botId}` returns the same object; `botId` must be the bot the key belongs to.

```bash
curl -H "Authorization: Bearer $BCM_KEY" https://api.bot-creator.fr/v1/bot
```
