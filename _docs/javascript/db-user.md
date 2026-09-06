---
layout: doc
title: db.user
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: User-scoped persistent storage — get, set, delete, list, find, and reset.
permalink: /docs/javascript/db-user/
related:
  - getUserVar
  - setUserVar
---

`db.user` stores values per Discord user. **BDFD equivalent:** [$getUserVar](/docs/getuservar/) / [$setUserVar](/docs/setuservar/).

## Guild context routing

When the script runs **inside a guild** (server channel, slash command, or component interaction), `db.user.*` automatically routes to **`guildMember` scope** — the same storage as [db.guildMember](/docs/javascript/db-guild-member/).

```javascript
// In a guild: writes to guildMember scope (user + guild composite key)
await db.user.set('xp', 50);

// Equivalent explicit call:
await db.guildMember.set('xp', 50);
```

In DMs or non-guild contexts, `db.user.*` uses global user scope. This matches BDFD behavior where user variables in servers are per-member.

## Variable registration

Scoped keys must be registered in the Bot Creator variable panel before `get` returns stored values. `set` auto-creates the definition if missing.

## Methods

### `await db.user.get(key, userId?)`

Returns the stored value for `key`. When `userId` is omitted, uses the command author from context.

```javascript
const coins = await db.user.get('coins');
const other = await db.user.get('coins', '123456789012345678');
```

### `await db.user.set(key, value, userId?)`

Writes `value` for `key`. Value can be any JSON-serializable type.

```javascript
await db.user.set('coins', 100);
await db.user.set('coins', 0, interaction.user.id);
```

### `await db.user.delete(key, userId?)`

Removes the key for the user.

### `await db.user.list(key, order?, limit?, offset?, filter?)`

Returns `{ id, value }[]` sorted by `key` values. `order` is `'asc'` or `'desc'`.

When a `filter` function is provided, the runtime fetches up to **10,000 rows** first, then filters client-side before applying `offset` and `limit`.

```javascript
const leaderboard = await db.user.list('coins', 'desc', 10, 0);
const rich = await db.user.list('coins', 'desc', 10, 0, (e) => e.value > 100);
```

**BDFD equivalent:** [$userLeaderboard](/docs/userleaderboard/) / [$globalUserLeaderboard](/docs/globaluserleaderboard/).

### `await db.user.find(filter)`

Returns `{ key, id, value }[]` for all matching entries. Requires a filter function.

```javascript
const matches = await db.user.find((entry) => entry.value > 500);
```

### `await db.user.reset(key)`

Purges all stored values for `key` and removes the variable definition.

**BDFD equivalent:** [$resetUserVar](/docs/resetuservar/).
