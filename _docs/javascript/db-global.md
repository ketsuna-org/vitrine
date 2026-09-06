---
layout: doc
title: db.global
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Bot-wide global persistent storage.
permalink: /docs/javascript/db-global/
related:
  - getvar
  - setvar
---

`db.global` stores bot-wide keys shared across all users and guilds.

**BDFD equivalent:** [$getVar](/docs/getvar/) / [$setVar](/docs/setvar/) (global scope).

## Methods

| Method | Description |
|--------|-------------|
| `await db.global.get(key)` | Read value (falls back to `config.globalVariables`) |
| `await db.global.set(key, value)` | Write value |
| `await db.global.delete(key)` | Delete key |

```javascript
await db.global.set('maintenance', true);
const mode = await db.global.get('maintenance');
```
