---
layout: doc
title: db.channel
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Channel-scoped persistent storage.
permalink: /docs/javascript/db-channel/
related:
  - getchannelvar
  - setchannelvar
---

`db.channel` stores values per Discord channel.

**BDFD equivalent:** [$getChannelVar](/docs/getchannelvar/) / [$setChannelVar](/docs/setchannelvar/).

## Methods

| Method | Description |
|--------|-------------|
| `await db.channel.get(key, channelId?)` | Read value for channel |
| `await db.channel.set(key, value, channelId?)` | Write value |
| `await db.channel.delete(key, channelId?)` | Delete key |
| `await db.channel.list(key, order?, limit?, offset?, filter?)` | Leaderboard-style list |
| `await db.channel.find(filter)` | Search `{ key, id, value }[]` |
| `await db.channel.reset(key)` | Purge values and remove definition |

```javascript
const count = await db.channel.get('msgCount');
await db.channel.set('msgCount', Number(count) + 1);
```
