---
layout: doc
title: $parentID
translation_key: docs
category: "Entity Info"
function_name: parentID
syntax: $parentID[(channelID)]
description: Alias of $channelCategoryID. Returns the ID of a channel's parent category.
---

# $parentID

The `$parentID` function is an **alias** of `$channelCategoryID` (both have the same implementation). It returns the ID of the parent of a Discord channel: the category for a channel inside a category, or the parent channel for a thread.

## Syntax

```
$parentID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel (`channel.id` context variable) is used. An ID that is not a positive integer raises `Invalid channel ID.`; an unknown channel raises `Channel not found.` |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the parent as reported by Discord, or `""` if the channel has none. |

## Examples

### Category ID

```bdfd
$sendMessage[Category ID: $parentID]
```

### Parent category name

```bdfd
$sendMessage[Parent category: $channelName[$parentID]]
```

### Check if in a category

```bdfd
$if[$parentID!=]
  $sendMessage[This channel is in the $channelName[$parentID] category]
$else
  $sendMessage[This channel is not in a category.]
$endif
```

## Notes

- `$parentID` is identical to `$channelCategoryID`.
- `$categoryID` is a different function: it takes a category **name** and returns the ID of the category with that exact name.
