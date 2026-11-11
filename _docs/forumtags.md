---
layout: doc
title: $forumTags
translation_key: docs
category: "Moderation"
function_name: forumTags
syntax: $forumTags[forumID;(separator)]
description: "Lists the tags of a forum or media channel as `id:name`."
---

# $forumTags

Lists the tags of a forum or media channel as `id:name`.

## Syntax

```
$forumTags[forumID;(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `forumID` | ID of the forum or media channel. |
| `separator` | Optional. Text between two tags. Default `, `. |

## Return Value

- string.

## Usage

```
$forumTags[123] → "5:City, 6:Castle"
```

## Example

```bdfd
$forumTags[$getGuildVar[forum];|]
```

## Notes

JavaScript: `bc.forum.tags(forumId)`.
