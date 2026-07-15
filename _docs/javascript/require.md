---
layout: doc
title: require()
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Whitelisted Node.js modules available in BDJS scripts.
permalink: /docs/javascript/require/
---

`require(moduleId)` loads sandbox-approved modules.

## Allowed modules

| Module | Purpose |
|--------|---------|
| `canvas` | Image drawing (node-canvas) |
| `@discordjs/voice` | Voice connections |
| `crypto` / `node:crypto` | Cryptographic utilities |
| `util` / `node:util` | Node utilities |
| `url` / `node:url` | URL parsing |
| `querystring` / `node:querystring` | Query string helpers |
| `discord.js` | Builders only — `Client` is **denied** |

## Examples

```javascript
const { EmbedBuilder } = require('discord.js');
const crypto = require('crypto');
const { createCanvas } = require('canvas');
```

## Module reference

| Module | Documentation |
|--------|---------------|
| `discord.js` | [discord.js builders](/docs/javascript/discordjs-builders/) |
| `canvas` | [canvas](/docs/javascript/canvas/) |
| `@discordjs/voice` | [voice](/docs/javascript/voice/) |
| `crypto` | `randomBytes`, `randomUUID`, `randomInt`, `createHash`, `createHmac`, `timingSafeEqual` |
| `util` | `inspect`, `format`, `formatWithOptions`, `types.is*` predicates |
| `url` | `URL`, `URLSearchParams` |
| `querystring` | `parse`, `stringify` |

## crypto example

```javascript
const crypto = require('crypto');
const id = crypto.randomUUID();
const hash = crypto.createHash('sha256').update('data').digest('hex');
```

See [sandbox](/docs/javascript/sandbox/) for the full whitelist and restrictions.
