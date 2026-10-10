---
layout: doc
title: $channelCategoryID
translation_key: docs
category: "Entity Info"
function_name: channelCategoryID
syntax: $channelCategoryID[(channelID)]
description: Returns the ID of the parent category of a Discord channel.
---

# $channelCategoryID

The `$channelCategoryID` function returns the **ID of the parent category** of a Discord channel. If the channel has no parent, the function returns an empty string. For a thread, the parent is the channel the thread belongs to, not a category.

## Syntax

```
$channelCategoryID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. An ID that is not a positive number raises `Invalid channel ID.`, an unknown channel raises `Channel not found.` |

## Return value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the parent (the category for a regular channel), or `""` if none. |

## Examples

### Get the parent category

```bdfd
$sendMessage[Category ID: $channelCategoryID]
```

### Name of the parent category

```bdfd
$sendMessage[Category name: $channelName[$channelCategoryID]]
```

### Check category membership

```bdfd
$if[$channelCategoryID==123456789012345678]
  $sendMessage[This channel is in the Administration category.]
$else
  $sendMessage[This channel is in another category.]
$endif
```

### Channel not in a category

```bdfd
$if[$channelCategoryID==]
  $sendMessage[This channel does not belong to any category.]
$endif
```

## Notes

- `$parentID[(channelID)]` behaves exactly like `$channelCategoryID`.
- `$categoryID` is **not** an alias: it takes a category *name* and returns its ID.
- DM channels do not have a parent category.
- Categories themselves do not have a parent category.
