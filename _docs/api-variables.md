---
layout: doc
title: "Variables resource"
category: "API"
api_type: general
description: "Read, write and delete variable values with the Bot Creator public API, with example requests and responses."
permalink: /docs/api-variables/
locale: en
translation_key: doc-api-variables
---

Variables have a scope: `global`, `user`, `guild`, `channel` or `guildMember`.

Base URL `https://api.bot-creator.fr/v1/bots/{botId}`. Authenticate with `Authorization: Bearer bcm_k_...`. See the [Public API guide]({{ '/docs/public-api/' | relative_url }}) for keys, scopes and limits.

## List variables

`GET /variables` · scope `read:bots`

Returns the global values and the variable definitions. Names that look like a secret are masked.

```json
{ "global": [], "definitions": [] }
```

## Read a value

`GET /variables/{scope}/{key}` · scope `read:bots`

With `scope_id` (and `scope_aux_id` when the scope needs two ids), it returns one value. Without them, it lists the stored values, paginated.

```bash
curl -H "Authorization: Bearer $BCM_KEY" \
  "$BASE/variables/guild/welcome_channel?scope_id=123456789012345678"
```

**Example response** (one value)

```json
{ "scope": "guild", "key": "welcome_channel", "found": true, "value": "987654321098765432" }
```

**Example response** (list)

```json
{ "scope": "guild", "key": "welcome_channel", "items": [], "next_cursor": null, "total": 0 }
```

## Write a value

`PUT /variables/{scope}/{key}` · scope `write:settings`

Body: `{ "value": ..., "scope_id"?, "scope_aux_id"? }`. `value` is any JSON value. A missing definition is created for you.

```bash
curl -X PUT "$BASE/variables/global/season" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"value":"7"}'
```

**Example response**

```json
{ "ok": true, "scope": "global", "key": "season", "runner_synced": true }
```

## Delete a value

`DELETE /variables/{scope}/{key}` · scope `write:settings`

Removes the value and keeps the definition. For a scoped value pass `scope_id` as a query parameter.
