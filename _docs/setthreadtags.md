---
layout: doc
title: $setThreadTags
translation_key: docs
category: "Moderation"
function_name: setThreadTags
syntax: $setThreadTags[threadID;tags]
description: "Replaces the tags of a forum post."
---

# $setThreadTags

Replaces the tags of a forum post.

## Syntax

```
$setThreadTags[threadID;tags]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | ID of the post (thread). |
| `tags` | Tag IDs or names separated by commas, 5 at most. Empty removes every tag. |

## Return Value

- string.

## Usage

```
$setThreadTags[90;City,Castle]
```

## Example

```bdfd
$setThreadTags[$getVar[post];Dungeon]
```

## Notes

The bot needs `Manage Threads`. JavaScript: `bc.forum.setTags(threadId, tags)`.
