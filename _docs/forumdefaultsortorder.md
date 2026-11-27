---
layout: doc
title: $forumDefaultSortOrder[]
translation_key: docs
category: "Entity Info"
function_name: forumDefaultSortOrder
syntax: $forumDefaultSortOrder[channelID]
description: "Returns the default sort order of a forum."
---
# $forumDefaultSortOrder — Returns the default sort order of a forum.

## Syntax

```
$forumDefaultSortOrder[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get default sort order from

## Return Value

- SortOrderType.

## Usage

```
$forumDefaultSortOrder[channelID] → result
```

## Example

```bdfd
$sendMessage[$forumDefaultSortOrder[36]]
```
