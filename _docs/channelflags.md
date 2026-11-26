---
layout: doc
title: $channelFlags[]
translation_key: docs
category: "Entity Info"
function_name: channelFlags
syntax: $channelFlags[channelID;(separator)]
description: "Returns the flags of a channel."
---
# $channelFlags — Returns the flags of a channel.

## Syntax

```
$channelFlags[channelID;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The id of the channel
- **separator** *(text, optional)* — The separator to use for every flag

## Return Value

- ChannelFlags[].

## Usage

```
$channelFlags[channelID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$channelFlags[36]]
```
