---
layout: doc
title: $categoryChannels
translation_key: docs
category: "Entity Info"
function_name: categoryChannels
syntax: $categoryChannels[categoryID;(separator)]
description: Returns the list of channel names belonging to a specific category.
---

# $categoryChannels

The `$categoryChannels` function returns a list of channels belonging to a specific category, identified by its ID.

## Syntax

```
$categoryChannels[categoryID;(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | The ID of the category. Required. |
| `separator` | Optional. Separator between the channel names. Default is `, `. |

## Return value

| Type | Description |
|---|---|
| `string` | The channel names in the category, separated by the delimiter. |

## Examples

### Channels in the current category

```bdfd
$sendMessage[**Channels in this category:** $categoryChannels[$categoryID]]
```

### List with newlines

```bdfd
$sendMessage[
**Channels in the category:**
$categoryChannels[$categoryID;
]]
```

### Channels of a specific category

```bdfd
$sendMessage[Admin channels: $categoryChannels[123456789012345678]]
```

### Check if a category is empty

```bdfd
$if[$categoryChannels[$categoryID]==]
  $sendMessage[This category does not contain any channels.]
$endif
```

## Notes

- Only lists channels visible to the bot.
- The category itself is not included in the list.
- To list all channels on the server, use `$channelNames`.
