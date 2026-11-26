---
layout: doc
title: $channelUserLimit[]
translation_key: docs
category: "Entity Info"
function_name: channelUserLimit
syntax: $channelUserLimit[channelID]
description: "Returns the user limit of the voice channel."
---
# $channelUserLimit — Returns the user limit of the voice channel.

## Syntax

```
$channelUserLimit[channelID]
```

## Parameters

- **channelID** *(id, required)* — The id of the channel

## Return Value

- Number.

## Usage

```
$channelUserLimit[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelUserLimit[32]]
```
