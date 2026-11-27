---
layout: doc
title: $startTyping[]
translation_key: docs
category: "Moderation"
function_name: startTyping
syntax: $startTyping[channelID]
description: "Starts typing in a channel."
---
# $startTyping — Starts typing in a channel.

## Syntax

```
$startTyping[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to start typing at

## Return Value

- string.

## Usage

```
$startTyping[channelID] → result
```

## Example

```bdfd
$startTyping[30]
$sendMessage[Done]
```
