---
layout: doc
title: "Database overview"
category: "API"
api_type: general
description: "Store structured data for your bot in spaces, collections and documents, and manage it from your own code with the Bot Creator public API."
permalink: /docs/api-database/
locale: en
translation_key: doc-api-database
---

The Database stores JSON documents for your bot. You read and write it over the public API with a key that has the `read:data` or `write:data` scope. Create the key as described in the [Public API guide]({{ '/docs/public-api/' | relative_url }}).

## Spaces, collections and documents

- A **space** is the owner of the data: a Discord server (`guilds`), a Discord user (`users`) or the bot itself (`bot-space`). `spaceId` is the Discord server id, the Discord user id, or an id you choose for the bot space.
- A **collection** groups documents in a space. Its name matches `[a-z0-9_][a-z0-9_.-]{0,63}`.
- A **document** is a JSON object with an id of 1 to 128 bytes.

Every route comes in three variants that only differ by the space segment of the path:

| Space | Path prefix |
|---|---|
| Discord server | `/v1/bots/{botId}/guilds/{spaceId}` |
| Discord user | `/v1/bots/{botId}/users/{spaceId}` |
| Bot | `/v1/bots/{botId}/bot-space/{spaceId}` |

The examples of this section use the server variant.

## Scopes

| Scope | Allows |
|---|---|
| `read:data` | Read, list, query, aggregate, usage, export |
| `write:data` | Create, replace, merge and delete documents, atomic operations, batches, collection settings, erasing a person |

## Routes at a glance

| Route | Scope | Page |
|---|---|---|
| `GET /v1/bots/{botId}/collections` | `read:data` | [Collections and settings]({{ '/docs/api-data-admin/' | relative_url }}) |
| `GET/PUT/PATCH/DELETE .../collections/{collection}/docs/{docId}` | read or write | [Documents]({{ '/docs/api-data-documents/' | relative_url }}) |
| `GET .../collections/{collection}/docs` | `read:data` | [Documents]({{ '/docs/api-data-documents/' | relative_url }}) |
| `POST .../collections/{collection}/query` and `/aggregate` | `read:data` | [Queries and aggregates]({{ '/docs/api-data-queries/' | relative_url }}) |
| `POST .../docs/{docId}/ops` and `POST .../batch` | `write:data` | [Atomic operations and batches]({{ '/docs/api-data-operations/' | relative_url }}) |
| `PUT .../collections/{collection}` | `write:data` | [Collections and settings]({{ '/docs/api-data-admin/' | relative_url }}) |
| `GET /v1/bots/{botId}/data/usage` and `/data/export` | `read:data` | [Collections and settings]({{ '/docs/api-data-admin/' | relative_url }}) |
| `DELETE /v1/bots/{botId}/subjects/{userId}` | `write:data` | [Collections and settings]({{ '/docs/api-data-admin/' | relative_url }}) |

## Document object

| Field | Type | Description |
|---|---|---|
| `space` | object | `kind` (`guild`, `bot` or `user`) and `id` |
| `collection` | string | Collection name |
| `id` | string | Document id |
| `data` | object | The document. Keys starting with `$` and `__proto__` are refused |
| `rev` | integer | Incremented at every write |
| `size_bytes` | integer | Stored size |
| `created_at`, `updated_at` | string | ISO 8601 timestamps |
| `expires_at` | string | Present when the document has a time to live |

**Example document object**

```json
{
  "space": { "kind": "guild", "id": "123456789012345678" },
  "collection": "profiles",
  "id": "234567890123456789",
  "data": { "xp": 1250, "level": 7, "badges": ["early"] },
  "rev": 4,
  "size_bytes": 71,
  "created_at": "2026-11-19T20:12:59Z",
  "updated_at": "2026-11-19T22:30:00Z"
}
```
