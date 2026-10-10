---
layout: doc
title: $categoryID
translation_key: docs
category: "Entity Info"
function_name: categoryID
syntax: $categoryID[categoryName]
description: Returns the ID of the category with the given name.
---

# $categoryID

The `$categoryID` function **looks up a category by its name** and returns its ID. To get the category of a channel, use `$channelCategoryID` instead.

## Syntax

```
$categoryID[categoryName]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryName` | Required. The exact name of the category (case-sensitive comparison). An empty name raises the error `Channel name is required.` |

## Return value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the category with that name, or an empty string if no category has this name. |

## Examples

### Get the ID of a category by its name

```bdfd
$sendMessage[Category ID: $categoryID[Information]]
```

### Check that a category exists

```bdfd
$if[$categoryID[Information]!=]
  $sendMessage[The category exists.]
$else
  $sendMessage[Category not found.]
$endif
```

### List channels of a category

```bdfd
$sendMessage[Channels: $categoryChannels[$categoryID[Information];, ]]
```

## Notes

- `$categoryID` is not an alias of `$channelCategoryID`: it takes a category name, not a channel ID.
- Only categories are searched; a channel with the same name is ignored.
- To get the category of a channel, use `$channelCategoryID` (or `$parentID`).
