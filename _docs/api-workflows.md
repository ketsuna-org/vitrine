---
layout: doc
title: "Workflows resource"
category: "API"
api_type: general
description: "Create, read, replace and archive workflows with the Bot Creator public API, with example responses."
permalink: /docs/api-workflows/
locale: en
translation_key: doc-api-workflows
---

Manage the workflows of your bot. The workflow document has the same format as the Studio: `GET` one you built there to see it.

Base URL `https://api.bot-creator.fr/v1/bots/{botId}`. Authenticate with `Authorization: Bearer bcm_k_...`. See the [Public API guide]({{ '/docs/public-api/' | relative_url }}) for keys, scopes and limits.

## List workflows

`GET /workflows` · scope `read:bots`

**Example response**

```json
{
  "items": [ { "name": "welcome" } ],
  "next_cursor": null,
  "revision": "r_8f2c1a"
}
```

## Get a workflow

`GET /workflows/{name}` · scope `read:bots`

```json
{
  "bot_id": "b_9c2e41",
  "revision": "r_8f2c1a",
  "workflow": { "name": "welcome" }
}
```

## Create or replace a workflow

`PUT /workflows/{name}` · scope `write:workflows` · body `{ "workflow": {...} }`

The server compiles the workflow: errors answer `422 validation_failed` and nothing is saved.

**Example response**

```json
{
  "revision": "r_8f2c1b",
  "workflow": { "name": "welcome" },
  "runner_synced": true,
  "compile": { "errors": [], "warnings": [] }
}
```

## Archive a workflow

`DELETE /workflows/{name}` · scope `write:workflows`

Archives the workflow: it is removed from the running bot and its last content is kept, so it can be restored.
