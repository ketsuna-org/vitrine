---
layout: doc
title: $createForumPost
translation_key: docs
category: "Moderation"
function_name: createForumPost
syntax: $createForumPost[forumID;title;message;(tags);(autoArchiveDuration);(returnID)]
description: "Creates a post (a thread with a first message and tags) in a forum or media channel."
---

# $createForumPost

Creates a post (a thread with a first message and tags) in a forum or media channel.

## Syntax

```
$createForumPost[forumID;title;message;(tags);(autoArchiveDuration);(returnID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `forumID` | ID of the forum or media channel (another type raises `The channel is not a forum or media channel.`). |
| `title` | Title of the post (1 to 100 characters). |
| `message` | First message (up to 2000 characters). A canvas rendered with `$attachImage` before the call is attached to it. |
| `tags` | Optional. Tag IDs or tag names separated by commas, 5 at most. An unknown tag raises `Unknown forum tag: name.` |
| `autoArchiveDuration` | Optional. 60, 1440 (default), 4320 or 10080 minutes. |
| `returnID` | Optional. `yes` returns the ID of the post (the ID of the thread); default `no`. |

## Return Value

- string.

## Usage

```
$createForumPost[123;Town of Ash;Founded by Bibi;City;1440;yes] → "90"
```

## Example

```bdfd
$setUserVar[post;$createForumPost[$getGuildVar[forum];$username founded a town;Welcome!;City;1440;yes]]
```

## Notes

The bot needs `Send Messages` in the forum. Discord only lets bots add tags that exist in the forum (`$forumTags`). JavaScript: `bc.forum.createPost(forumId, title, message, {tags, archiveMinutes})`.
