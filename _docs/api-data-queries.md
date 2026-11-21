---
layout: doc
title: "Queries and aggregates"
category: "API"
api_type: general
description: "Query documents with filters and sorting, and compute counts, sums, top lists and ranks with the Bot Creator Database API."
permalink: /docs/api-data-queries/
locale: en
translation_key: doc-api-data-queries
---

Base URL `https://api.bot-creator.fr/v1/bots/{botId}/guilds/{spaceId}`. Both routes need `read:data`.

## Query documents

`POST /collections/{collection}/query`

Use it instead of the `filter` query parameter when the filter is long.

| Body field | Type | Description |
|---|---|---|
| `where` | object | Filter, same operators as the list route |
| `sort` | array | At most one pair: `[["xp","desc"]]` |
| `limit` | integer | 1 to 100 |
| `after` | string | `next_cursor` of the previous page |

```bash
curl -X POST "$BASE/collections/profiles/query" \
  -H "Authorization: Bearer $BCM_KEY" -H "Content-Type: application/json" \
  -d '{"where":{"level":{"$gte":5}},"sort":[["xp","desc"]],"limit":10}'
```

The answer has the same shape as the list route: `{ "docs": [...], "next_cursor": "..." }`.

## Aggregate

`POST /collections/{collection}/aggregate`

| Body field | Type | Description |
|---|---|---|
| `op` | string | `count`, `sum`, `top` or `rank` |
| `field` | string | Field to sum, rank or sort on |
| `where` | object | Optional filter |
| `id` | string | `rank`: the document to rank |
| `n` | integer | `top`: number of documents, 10 by default |
| `desc` | boolean | Descending order, `true` by default |

**Example: top 3 by XP**

```json
{ "op": "top", "field": "xp", "n": 3 }
```

**Example: rank of one document**

```json
{ "op": "rank", "field": "xp", "id": "234567890123456789" }
```

On large collections the fields used by `where`, `sort` and aggregates need a declared index (`422 needs_index`).
