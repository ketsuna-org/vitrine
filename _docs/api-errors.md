---
layout: doc
title: "Errors, pagination and limits"
category: "API"
api_type: general
description: "Error format and codes, cursor pagination, rate limit headers and versioning of the Bot Creator public API, with examples."
permalink: /docs/api-errors/
locale: en
translation_key: doc-api-errors
---

Conventions shared by every route of the public API.

## Error object

```json
{
  "code": "missing_scope",
  "message": "This key does not have the scope publish:commands.",
  "details": { "required_scope": "publish:commands" },
  "request_id": "req_01HZX3"
}
```

Rely on `code`, which is stable, not on `message`. Quote `request_id` to the support. The full table of codes is in the [Public API guide]({{ '/docs/public-api/' | relative_url }}#errors).

**Example validation error** (`422`)

```json
{
  "code": "validation_failed",
  "message": "The command did not compile.",
  "details": [ { "message": "..." } ],
  "request_id": "req_01HZX4"
}
```

## Pagination

Lists answer `{ "items": [...], "next_cursor": "..." }`. Pass `next_cursor` back as `cursor`. It is `null` on the last page. Cursors are opaque.

```json
{ "items": [ { "id": "hello" } ], "next_cursor": "eyJvIjo1MH0" }
```

## Rate limits

Every authenticated response carries `X-RateLimit-Limit` and `X-RateLimit-Remaining`. Over the limit, the API answers `429 rate_limited` with `Retry-After` (seconds) and `X-RateLimit-Reset`.

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 12
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
```

## Versioning

`/v1` only receives backward-compatible additions. Ignore fields you do not know.
