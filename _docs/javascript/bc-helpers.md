---
layout: doc
title: bc.math, bc.vars, bc.lock, bc.forum, bc.activity
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Helpers of the BDFD engine for JavaScript bots - safe integer maths, hashing, atomic counters, locks, forum posts and channel activity.
permalink: /docs/javascript/bc-helpers/
---

These helpers give a JavaScript bot the same tools as the BDFD functions of the same name, with the same results.

| JavaScript | BDFD |
| --- | --- |
| `bc.math.floorDiv(a, b)` and `bc.math.mod(a, b)` | `$floorDiv`, `$mod` (rounded down, the remainder is never negative: `mod(-3, 8)` is `5`) |
| `bc.math.hash(text, 'fnv1a' \| 'crc32' \| 'sha256', modulo?)` | `$hash` |
| `bc.math.seededRandom(seed, min, max)` | `$seededRandom` (same seed, same number) |
| `await bc.vars.increment(scope, key, n?, id?)` and `decrement` | `$increment`, `$decrement` (atomic: two clicks at the same time never lose a write) |
| `await bc.vars.compareAndSet(scope, key, expected, next, id?)` | `$compareAndSetVar` |
| `await bc.vars.listAddUnique(scope, key, item, id?)` | adds to a `,a,b,` list without duplicates, atomically |
| `await bc.vars.list(prefix, limit?)` | `$listVars` |
| `bc.lock.tryLock(name, seconds?)` and `bc.lock.unlock(name)` | `$tryLock`, `$unlock` |
| `await bc.forum.createPost(forumId, title, message, {tags, archiveMinutes, files})` | `$createForumPost` |
| `await bc.forum.tags(forumId)` and `await bc.forum.setTags(threadId, tags)` | `$forumTags`, `$setThreadTags` |
| `bc.activity.messageCount(channelId, minutes?, humansOnly?)` | `$channelMessageCount` |

Scopes are `user`, `guild`, `channel`, `message`, `guildMember` and `global`. Atomic operations are atomic inside one runner process.

```js
const block = bc.math.floorDiv(x, 8);
const cell = bc.math.mod(x, 8);
if (bc.lock.tryLock(`chunk:${block}`)) {
  try {
    const id = await bc.forum.createPost(forumId, `Ash Town (${x}, ${y})`, 'Founded!', { tags: ['City'] });
  } finally {
    bc.lock.unlock(`chunk:${block}`);
  }
}
```

To edit a message with a new image, discord.js already does it: `message.edit({ files: [attachment] })`.
