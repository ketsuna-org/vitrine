---
layout: doc
title: $channelIsChildrenOf[]
translation_key: docs
category: "Entity Info"
function_name: channelIsChildrenOf
syntax: $channelIsChildrenOf[channelID;categoryID]
description: "Checks whether given channel is a children of a category."
---
# $channelIsChildrenOf — Checks whether given channel is a children of a category.

## Syntax

```
$channelIsChildrenOf[channelID;categoryID]
```

## Parameters

- **channelID** *(id, required)* — The channel to know if is children of category
- **categoryID** *(id, required)* — The category to check against

## Return Value

- Boolean.

## Usage

```
$channelIsChildrenOf[channelID;categoryID] → result
```

## Example

```bdfd
$sendMessage[$channelIsChildrenOf[30;40]]
```
