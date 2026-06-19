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

The `$channelCategoryID` function returns the **ID of the parent category** of a Discord channel. If the channel does not belong to any category, the function returns an empty string.

## Syntax

```
$channelCategoryID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the parent category, or `""` if none. |

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

- `$parentID` and `$categoryID` are aliases of `$channelCategoryID`.
- DM channels do not have a parent category.
- Categories themselves do not have a parent category.
