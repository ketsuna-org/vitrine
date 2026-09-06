---
layout: doc
title: db.message
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Message-scoped persistent storage.
permalink: /docs/javascript/db-message/
related:
  - getmessagevar
  - setmessagevar
---

`db.message` stores values tied to a specific message ID.

**BDFD equivalent:** [$getMessageVar](/docs/getmessagevar/) / [$setMessageVar](/docs/setmessagevar/).

## Methods

| Method | Description |
|--------|-------------|
| `await db.message.get(key, messageId?)` | Read value for message |
| `await db.message.set(key, value, messageId?)` | Write value |
| `await db.message.delete(key, messageId?)` | Delete key |
| `await db.message.list(key, order?, limit?, offset?, filter?)` | List entries |
| `await db.message.find(filter)` | Search `{ key, id, value }[]` |
| `await db.message.reset(key)` | Purge values and remove definition |

```javascript
const flag = await db.message.get('processed');
await db.message.set('processed', true);
```
