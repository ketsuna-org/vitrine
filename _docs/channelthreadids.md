---
layout: doc
title: $channelThreadIDs[]
translation_key: docs
category: "Entity Info"
function_name: channelThreadIDs
syntax: $channelThreadIDs[channelID;(separator)]
description: "Returns the thread ids of a channel."
---
# $channelThreadIDs — Returns the thread ids of a channel.

## Syntax

```
$channelThreadIDs[channelID;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The channel to get its threads
- **separator** *(text, optional)* — The separator to use for every thread

## Return Value

- Channel[].

## Usage

```
$channelThreadIDs[channelID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$channelThreadIDs[30;,]]
```
