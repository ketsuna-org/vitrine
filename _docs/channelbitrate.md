---
layout: doc
title: $channelBitrate[]
translation_key: docs
category: "Entity Info"
function_name: channelBitrate
syntax: $channelBitrate[channelID]
description: "Returns the bitrate of the voice channel."
---
# $channelBitrate — Returns the bitrate of the voice channel.

## Syntax

```
$channelBitrate[channelID]
```

## Parameters

- **channelID** *(id, required)* — The id of the channel

## Return Value

- Number.

## Usage

```
$channelBitrate[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelBitrate[32]]
```
