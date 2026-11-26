---
layout: doc
title: $channelChildrenIDs[]
translation_key: docs
category: "Entity Info"
function_name: channelChildrenIDs
syntax: $channelChildrenIDs[channelID;(separator)]
description: "Returns the children ids this category has."
---
# $channelChildrenIDs — Returns the children ids this category has.

## Syntax

```
$channelChildrenIDs[channelID;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The category to get its children
- **separator** *(text, optional)* — The separator to use for every channel

## Return Value

- Channel[].

## Usage

```
$channelChildrenIDs[channelID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$channelChildrenIDs[40;,]]
```
