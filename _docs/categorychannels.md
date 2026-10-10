---
layout: doc
title: $categoryChannels
translation_key: docs
category: "Entity Info"
function_name: categoryChannels
syntax: $categoryChannels[categoryID;separator;(option)]
description: Returns the channels belonging to a specific category (names by default, or IDs, mentions or the count), joined by a separator.
---

# $categoryChannels

The `$categoryChannels` function returns the channels belonging to a specific category, identified by its ID. By default it returns their names.

## Syntax

```
$categoryChannels[categoryID;separator;(option)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | The ID of the category. Required. The ID must be a positive number and must belong to a guild category, otherwise the function raises an error (`Invalid category ID.` / `Channel is not a guild category.`). |
| `separator` | Required. Text inserted between the items. |
| `option` | Optional. `name` (default), `id`, `mention` (`<#ID>`) or `count`. With `count`, the number of channels is returned and the separator is unused. Any other value raises an error. |

## Return value

| Type | Description |
|---|---|
| `string` | The channels of the category (names, IDs or mentions) joined by the separator, or their count with the `count` option. |

## Examples

### Channels in the current category

```bdfd
$sendMessage[**Channels in this category:** $categoryChannels[$channelCategoryID;, ]]
```

### List with newlines

```bdfd
$sendMessage[
**Channels in the category:**
$categoryChannels[$channelCategoryID;
]]
```

### Channels of a specific category

```bdfd
$sendMessage[Admin channels: $categoryChannels[123456789012345678;, ]]
```

### Check if a category is empty

```bdfd
$if[$categoryChannels[$channelCategoryID;,;count]==0]
  $sendMessage[This category does not contain any channels.]
$endif
```

## Notes

- Only the channels whose parent is the category are listed; the category itself is not included.
- Use `$channelCategoryID` to get the category of the current channel.
- To list all channels on the server, use `$channelNames`.
