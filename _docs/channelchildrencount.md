---
layout: doc
title: $channelChildrenCount[]
translation_key: docs
category: "Entity Info"
function_name: channelChildrenCount
syntax: $channelChildrenCount[channelID]
description: "Returns the amount of children this category has."
---
# $channelChildrenCount — Returns the amount of children this category has.

## Syntax

```
$channelChildrenCount[channelID]
```

## Parameters

- **channelID** *(id, required)* — The category to get its child count

## Return Value

- Number.

## Usage

```
$channelChildrenCount[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelChildrenCount[40]]
```
