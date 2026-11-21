---
layout: doc
title: bc.db
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: The Bot Creator database for JavaScript bots - collections of JSON documents, atomic counters, queries and rankings, with the same results as the $db functions.
permalink: /docs/javascript/bc-db/
---

`bc.db` gives a JavaScript bot the same database as the `$db*` functions of BDFD, with the same spaces, the same limits and the same errors. Documents live in **collections**, created on first write. The data is stored by Bot Creator and counted in the plan's quota; reads are never counted.

The data lives in the **server's space** (the user's own space in a direct message). `bc.db.space('user' | 'bot' | 'guild')` switches the rest of the run, like [`$dbSpace`](/docs/dbspace/). A script can never name another server or another user.

```js
await bc.db.set('players', interaction.user.id, { name: interaction.user.username, xp: 0 });
const xp = await bc.db.increment('players', interaction.user.id, 'xp', 10);
const top = await bc.db.top('players', 'xp', 10);
```

## Functions

| JavaScript | BDFD |
| --- | --- |
| `await bc.db.get(collection, id, path?, fallback?)` | `$dbGet` (the document, or one value by dotted path; `fallback` when missing) |
| `await bc.db.exists(collection, id)` | `$dbExists` |
| `await bc.db.set(collection, id, object)` | `$dbSet` (replaces the document, returns the revision) |
| `await bc.db.create(collection, id, object)` | `$dbCreate` (fails with `conflict` if it exists) |
| `await bc.db.update(collection, id, path, value)` | `$dbUpdate` (changes one field, `a.b` creates the nesting) |
| `await bc.db.increment(collection, id, path, delta, min?, max?)` | `$dbIncrement` (atomic; returns the new value) |
| `await bc.db.push(collection, id, path, value, maxLen?)` | `$dbPush` |
| `await bc.db.pull(collection, id, path, value)` | `$dbPull` |
| `await bc.db.addToSet(collection, id, path, value, maxLen?)` | `$dbAddToSet` |
| `await bc.db.delete(collection, id)` | `$dbDelete` (`true` if something was deleted) |
| `await bc.db.transfer(collection, from, to, path, amount)` | `$dbTransfer` (atomic: nothing moves if it fails) |
| `await bc.db.batch([{ op, collection, id, ... }])` | `$dbBatch` (all or nothing, one result per operation) |
| `await bc.db.find(collection, field, op, value, { sort, limit, after })` | `$dbFind` (`op`: `=`, `!=`, `<`, `<=`, `>`, `>=`, `in`, `prefix`; `sort`: `'xp'`, `'-xp'`) |
| `await bc.db.find(collection, { where, sort, limit, after })` | the same query as an object |
| `await bc.db.count(collection, field?, op?, value?)` | `$dbCount` |
| `await bc.db.top(collection, field, n, order?)` | `$dbTop` |
| `await bc.db.rank(collection, field, id, order?)` | `$dbRank` (1 is the best) |
| `await bc.db.cooldown(collection, id, seconds)` | `$dbCooldown` (`0` when it just started, otherwise the seconds left) |
| `bc.db.space(kind)` | `$dbSpace` |
| `bc.db.lastError()` | `$dbLastError` |

## Errors

A data outcome (`conflict`, `quota`, `needs_index`, `timeout`) does **not** throw: the call returns `null` (or the fallback) and `bc.db.lastError()` says why. A mistake in the script (`invalid`) or a runner without a database (`unavailable`) throws a `BcDbError` with a `code`.

```js
const rev = await bc.db.create('claims', interaction.user.id, { at: Date.now() });
if (rev === null && bc.db.lastError() === 'conflict') {
  return interaction.reply('Already claimed.');
}
```

A filter on a field needs an index: create it from the Database page of the bot, otherwise `find` reports `needs_index`.
