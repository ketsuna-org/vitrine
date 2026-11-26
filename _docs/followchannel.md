---
layout: doc
title: $followChannel[]
translation_key: docs
category: "Moderation"
function_name: followChannel
syntax: $followChannel[channelID;channelID;(reason)]
description: "Follows given announcement channel, returns webhook id"
---
# $followChannel — Follows given announcement channel, returns webhook id

## Syntax

```
$followChannel[channelID;channelID;(reason)]
```

## Parameters

- **channelID** *(id, required)* — The channel to follow
- **channelID** *(id, required)* — The channel to crosspost messages in
- **reason** *(text, optional)* — The reason for following the channel

## Return Value

- Webhook.

## Usage

```
$followChannel[channelID;channelID;(reason)] → result
```

## Example

```bdfd
$sendMessage[$followChannel[30;31]]
```
