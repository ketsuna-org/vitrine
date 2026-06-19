---
layout: doc
title: $categoryID
translation_key: docs
category: "Entity Info"
function_name: categoryID
syntax: $categoryID[(channelID)]
description: Alias of $channelCategoryID. Returns the ID of the parent category of a channel.
---

# $categoryID

The `$categoryID` function is an **alias** of `$channelCategoryID`. It returns the ID of the category to which the current (or specified) channel belongs.

## Syntax

```
$categoryID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the parent category, or an empty string if the channel is not in a category. |

## Examples

### Get the ID of the category

```bdfd
$sendMessage[Category ID: $categoryID]
```

### Display the name of the category

```bdfd
$if[$categoryID!=]
  $sendMessage[Category: $channelName[$categoryID]]
$else
  $sendMessage[This channel is not in a category.]
$endif
```

### List channels in the same category

```bdfd
$sendMessage[Other channels in this category: $categoryChannels[$categoryID]]
```

## Notes

- `$categoryID` and `$parentID` are aliases of `$channelCategoryID`.
- Returns an empty string for channels not in a category and DMs.
