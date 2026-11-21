---
layout: doc
title: "Documents"
category: "API"
api_type: general
description: "Read, list, create, replace, merge and delete documents of the Bot Creator Database, with example requests and responses."
permalink: /docs/api-data-documents/
locale: en
translation_key: doc-api-data-documents
---

Base URL `https://api.bot-creator.fr/v1/bots/{botId}/guilds/{spaceId}`. Replace `guilds` with `users` or `bot-space` for the other spaces. See the [Database overview]({{ '/docs/api-database/' | relative_url }}) for spaces and the document object.

## Get a document

`GET /collections/{collection}/docs/{docId}` · scope `read:data`

```bash
curl -H "Authorization: Bearer $BCM_KEY" \
  "$BASE/collections/profiles/docs/234567890123456789"
```

**Example response**

```json
{
  "space": { "kind": "guild", "id": "123456789012345678" },
  "collection": "profiles",
  "id": "234567890123456789",
  "data": { "xp": 1250, "level": 7 },
  "rev": 4,
  "size_bytes": 28,
  "created_at": "2026-11-19T20:12:59Z",
  "updated_at": "2026-11-19T22:30:00Z"
}
```

A missing document answers `404`.

## Create or replace a document

`PUT /collections/{collection}/docs/{docId}` · scope `write:data`

| Body field | Type | Description |
|---|---|---|
| `data` | object | Required. The document |
| `ttl_seconds` | integer | Optional. Deletes the document after this many seconds |
| `rev` | integer | Optional compare-and-set: refused with `409 conflict` if the stored revision differs |

```bash
curl -X PUT "$BASE/collections/profiles/docs/234567890123456789" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"data":{"xp":1250,"level":7},"rev":4}'
```

**Example error** (`409`)

```json
{
  "code": "conflict",
  "message": "The stored revision differs.",
  "request_id": "req_01HZX5"
}
```

## Merge into a document

`PATCH /collections/{collection}/docs/{docId}` · scope `write:data`

Merges the fields of `data` into the stored document and keeps the other fields.

```bash
curl -X PATCH "$BASE/collections/profiles/docs/234567890123456789" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"data":{"level":8}}'
```

## Delete a document

`DELETE /collections/{collection}/docs/{docId}` · scope `write:data`

## List documents

`GET /collections/{collection}/docs` · scope `read:data`

| Query | Description |
|---|---|
| `limit` | 1 to 100, 100 by default |
| `cursor` | `next_cursor` of the previous page |
| `sort` | Field to sort on, `-` prefix for descending (`-xp`). Documents without the field are left out |
| `filter` | JSON `where` object, for example `{"xp":{"$gte":100}}` |

Filter operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$prefix`. On large collections the fields you filter or sort on must have a declared index, otherwise the API answers `422 needs_index` (see [Collections and settings]({{ '/docs/api-data-admin/' | relative_url }})).

**Example response**

```json
{
  "docs": [
    { "id": "234567890123456789", "collection": "profiles", "data": { "xp": 1250 }, "rev": 4 }
  ],
  "next_cursor": "eyJvIjoxMDB9"
}
```
