---
layout: doc
title: "Atomic operations and batches"
category: "API"
api_type: general
description: "Change documents atomically with incr, push, pull, addToSet and compare-and-set, and apply up to 20 operations in one all-or-nothing batch with the Bot Creator Database API."
permalink: /docs/api-data-operations/
locale: en
translation_key: doc-api-data-operations
---

Base URL `https://api.bot-creator.fr/v1/bots/{botId}/guilds/{spaceId}`. Both routes need `write:data`. Use them instead of read-then-write, which can lose updates when two writers collide.

## Atomic operation on a document

`POST /collections/{collection}/docs/{docId}/ops`

| Body field | Type | Description |
|---|---|---|
| `op` | string | `incr`, `push`, `pull` or `addToSet` |
| `path` | string | Dotted path in the document, for example `stats.wins` |
| `value` | any | Value to push, pull or add |
| `delta` | number | `incr`: amount to add. Integers stay exact up to 2^53-1 |
| `min`, `max` | number | `incr`: bounds for the result |
| `max_len` | integer | `push` and `addToSet`: keep the newest `max_len` items |
| `rev` | integer | Compare-and-set on the revision (`409 conflict` on mismatch) |
| `return` | string | `doc` (default) returns the stored document. `none` applies the write and answers `{"ok":true}` without it |

```bash
curl -X POST "$BASE/collections/profiles/docs/234567890123456789/ops" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"op":"incr","path":"xp","delta":25}'
```

The answer is the stored document (see the [Database overview]({{ '/docs/api-database/' | relative_url }})), unless you send `"return":"none"`: the counter is still incremented, but the new value is not sent back.

**Example: keep the last 5 events**

```json
{ "op": "push", "path": "history", "value": "won", "max_len": 5 }
```

## Batch

`POST /batch`

Applies up to 20 operations in one transaction: either all succeed or none is applied.

| Operation field | Type | Description |
|---|---|---|
| `op` | string | `set`, `create`, `merge`, `incr`, `push`, `pull`, `addToSet`, `delete` or `transfer` |
| `collection`, `id` | string | Target document |
| `path`, `value`, `delta`, `min`, `max`, `max_len`, `rev`, `ttl_seconds`, `return` | | As in the single operation. With `"return":"none"` the result of that operation has no document |
| `to_id` | string | `transfer`: destination document. `delta` is the amount moved |

**Example request**

```json
{
  "ops": [
    { "op": "transfer", "collection": "wallets", "id": "111", "to_id": "222", "path": "coins", "delta": 50 },
    { "op": "push", "collection": "logs", "id": "trades", "path": "items", "value": "111->222", "max_len": 100 }
  ]
}
```

**Example response**

```json
{ "ok": true, "results": [ { "...": "one result per operation" } ] }
```
