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

The `$parentID` function is an **alias** of `$channelCategoryID`. It returns the ID of a Discord channel's parent category.

## Syntax

```
$parentID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The parent category ID, or `""` if none. |

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

- `$parentID` and `$categoryID` are both aliases of `$channelCategoryID`.
- Functioning identical to `$channelCategoryID`.
