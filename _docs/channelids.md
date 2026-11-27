---
layout: doc
title: $channelIDs[]
translation_key: docs
category: "Entity Info"
function_name: channelIDs
syntax: $channelIDs[(separator)]
description: "Returns every channel id."
---
# $channelIDs — Returns every channel id.

## Syntax

```
$channelIDs[(separator)]
```

## Parameters

- **separator** *(text, optional)* — The separator to use for every channel

## Return Value

- Channel[].

## Usage

```
$channelIDs[(separator)] → result
```

## Example

```bdfd
$sendMessage[$channelIDs[,]]
```
