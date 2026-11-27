---
layout: doc
title: $channelURL[]
translation_key: docs
category: "Entity Info"
function_name: channelURL
syntax: $channelURL[channelID]
description: "Returns the url of a channel."
---
# $channelURL — Returns the url of a channel.

## Syntax

```
$channelURL[channelID]
```

## Parameters

- **channelID** *(id, required)* — The id of the channel

## Return Value

- URL.

## Usage

```
$channelURL[channelID] → result
```

## Example

```bdfd
$sendMessage[$channelURL]
```
