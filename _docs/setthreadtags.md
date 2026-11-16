---
layout: doc
title: $setThreadTags
translation_key: docs
category: "Moderation"
function_name: setThreadTags
syntax: $setThreadTags[threadID;tags;(reason)]
description: "Replaces the tags of a forum post."
---

# $setThreadTags

Replaces the tags of a forum post.

## Syntax

```
$setThreadTags[threadID;tags;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | ID of the post (thread). |
| `tags` | Tag IDs or names separated by commas, 5 at most. Empty removes every tag. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

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

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
