---
layout: doc
title: "Collections, usage, export and erasure"
category: "API"
api_type: general
description: "Declare indexes and time to live, read usage and limits, export all data as NDJSON and erase one person's data with the Bot Creator Database API."
permalink: /docs/api-data-admin/
locale: en
translation_key: doc-api-data-admin
---

Routes that manage the Database as a whole. Replace `guilds` with `users` or `bot-space` for the other spaces.

## List collections

`GET /v1/bots/{botId}/collections` · scope `read:data`

**Example response**

```json
{
  "collections": [
    { "space_kind": "guild", "name": "profiles", "docs": 1280, "bytes": 91234, "indexes": [], "default_ttl_seconds": 0 }
  ]
}
```

## Collection settings

`PUT /v1/bots/{botId}/guilds/{spaceId}/collections/{collection}` · scope `write:data`

| Field | Type | Description |
|---|---|---|
| `indexes` | array | Items `{ "name", "field", "type" }`, with `type` among `text`, `number`, `bool`, `timestamp` |
| `default_ttl_seconds` | integer | Default time to live of new documents |
| `subject_field` | string | Field holding a Discord user id, used by the erase route below |
| `field_labels` | object | Field name to label: `pii`, `secret`, `discord_user_id` or `message_content` |

**Example request**

```json
{
  "indexes": [ { "name": "xp", "field": "xp", "type": "number" } ],
  "subject_field": "user_id",
  "field_labels": { "email": "pii" }
}
```

## Usage and limits

`GET /v1/bots/{botId}/data/usage` · scope `read:data`

**Example response**

```json
{ "docs": 1280, "bytes": 91234, "max_docs": 10000, "max_bytes": 10485760, "paid": false }
```

## Export

`GET /v1/bots/{botId}/data/export` · scope `read:data`

Streams every document as NDJSON, one JSON object per line with `space_kind`, `space_id`, `collection`, `id`, `rev`, `data` and `updated_at`. The response is gzip-compressed when you send `Accept-Encoding: gzip`. The export stays available even above the limits.

```bash
curl -H "Authorization: Bearer $BCM_KEY" -H "Accept-Encoding: gzip" \
  https://api.bot-creator.fr/v1/bots/$BOT/data/export --output data.ndjson.gz
```

## Erase one person's data

`DELETE /v1/bots/{botId}/subjects/{userId}` · scope `write:data`

Deletes the documents that belong to one Discord user, found through the `subject_field` of each collection. Use it to answer an erasure request.

**Example response**

```json
{ "ok": true, "deleted_documents": 12 }
```
