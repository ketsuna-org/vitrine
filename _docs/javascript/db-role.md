---
layout: doc
title: db.role
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Role-scoped persistent storage.
permalink: /docs/javascript/db-role/
related:
  - getrolevar
  - setrolevar
  - deleterolevar
---

`db.role` stores values per Discord role. A role is never implied by the context: pass its ID every time.

**BDFD equivalent:** [$getRoleVar](/docs/getrolevar/) / [$setRoleVar](/docs/setrolevar/) / [$deleteRoleVar](/docs/deleterolevar/).

## Methods

| Method | Description |
|--------|-------------|
| `await db.role.get(key, roleId)` | Read value for a role |
| `await db.role.set(key, value, roleId)` | Write value |
| `await db.role.delete(key, roleId)` | Delete key |
| `await db.role.list(key, order?, limit?, offset?, filter?)` | Leaderboard-style list |
| `await db.role.find(filter)` | Search `{ key, id, value }[]` |
| `await db.role.reset(key)` | Purge values and remove definition |

```javascript
const points = Number(await db.role.get('points', roleId)) || 0;
await db.role.set('points', points + 10, roleId);
```
