---
layout: doc
title: db — Storage API
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Persistent key-value storage for BDJS scripts — global, user, guild, channel, message, and guildMember scopes.
permalink: /docs/javascript/db/
---

The `db` global provides async persistent storage for JavaScript command scripts. It mirrors BDFD variable functions (`$getUserVar`, `$setVar`, etc.) with a Promise-based API.

## Namespaces

| Namespace | Scope | BDFD equivalent |
|-----------|-------|-----------------|
| `db.global` | Bot-wide keys | `$getVar` / `$setVar` (global) |
| `db.user` | Per Discord user | `$getUserVar` / `$setUserVar` |
| `db.guild` | Per guild (server) | `$getGuildVar` / `$setGuildVar` |
| `db.channel` | Per channel | `$getChannelVar` / `$setChannelVar` |
| `db.message` | Per message | `$getMessageVar` / `$setMessageVar` |
| `db.guildMember` | Per user in a guild | `$getMemberVar` / `$setMemberVar` |

## Common methods (scoped namespaces)

| Method | Description |
|--------|-------------|
| `get(key, id?)` | Read a value |
| `set(key, value, id?)` | Write a value |
| `delete(key, id?)` | Remove a key |
| `list(key, order?, limit?, offset?, filter?)` | Leaderboard-style list |
| `find(filter?)` | Search entries |
| `reset(key)` | Reset a key to default |

`db.global` only exposes `get`, `set`, and `delete`.

## Examples

```javascript
// User coins (current user from context)
const coins = await db.user.get('coins');
await db.user.set('coins', (Number(coins) || 0) + 5);

// Global counter
await db.global.set('counter', 1);
const count = await db.global.get('counter');

// Leaderboard top 10
const top = await db.user.list('coins', 'desc', 10, 0);
```

## Detail pages

- [db.user](/docs/javascript/db-user/)
- [db.global](/docs/javascript/db-global/)
- [db.guild](/docs/javascript/db-guild/)
- [db.channel](/docs/javascript/db-channel/)
- [db.message](/docs/javascript/db-message/)
- [db.guildMember](/docs/javascript/db-guild-member/)
