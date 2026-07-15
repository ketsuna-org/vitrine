---
layout: doc
title: db.guildMember
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Guild-member-scoped storage (user within a specific guild).
permalink: /docs/javascript/db-guild-member/
related:
  - getmembervar
  - setmembervar
---

`db.guildMember` stores values per user within a guild (composite `guildId:userId` scope).

**BDFD equivalent:** [$getMemberVar](/docs/getmembervar/) / [$setMemberVar](/docs/setmembervar/).

In guild contexts, [db.user](/docs/javascript/db-user/) routes here automatically.

## Methods

### `await db.guildMember.get(key, userId?, guildId?)`

Returns the stored value. When IDs are omitted, uses the current interaction/message context.

### `await db.guildMember.set(key, value, userId?, guildId?)`

Writes `value` for `key`.

```javascript
await db.guildMember.set('xp', 100, interaction.user.id, guild.id);
const xp = await db.guildMember.get('xp');
```

### `await db.guildMember.delete(key, userId?, guildId?)`

Removes the key for the guild member.

### `await db.guildMember.list(key, order?, limit?, offset?, filter?)`

Returns `{ id, value }[]`. Filter runs client-side after fetching up to 10,000 rows.

### `await db.guildMember.find(filter)`

Returns `{ key, id, value }[]`. Requires a filter function.

### `await db.guildMember.reset(key)`

Purges all values and removes the variable definition.
