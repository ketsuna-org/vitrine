---
layout: doc
title: db.guild
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Guild-scoped persistent storage.
permalink: /docs/javascript/db-guild/
related:
  - getguildvar
  - setguildvar
---

`db.guild` stores values per Discord guild (server).

**BDFD equivalent:** [$getGuildVar](/docs/getguildvar/) / [$setGuildVar](/docs/setguildvar/).

## Methods

Same as `db.user`: `get`, `set`, `delete`, `list`, `find`, `reset`. Optional second argument is `guildId`.

```javascript
const level = await db.guild.get('level');
await db.guild.set('level', 5, guild.id);
```
