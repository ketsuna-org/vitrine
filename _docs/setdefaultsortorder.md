---
layout: doc
title: $setDefaultSortOrder[]
translation_key: docs
category: "Moderation"
function_name: setDefaultSortOrder
syntax: $setDefaultSortOrder[channelID;(layout);(reason)]
description: "Sets a forum's default sort order of posts."
---
# $setDefaultSortOrder — Sets a forum's default sort order of posts.

## Syntax

```
$setDefaultSortOrder[channelID;(layout);(reason)]
```

## Parameters

- **channelID** *(id, required)* — The forum to modify
- **layout** *(text, optional)* — The new default sort order, leave empty to reset
- **reason** *(text, optional)* — The reason for modifying default sort order

## Return Value

- Boolean.

## Usage

```
$setDefaultSortOrder[channelID;(layout);(reason)] → result
```

## Example

```bdfd
$sendMessage[$setDefaultSortOrder[36;1]]
```
