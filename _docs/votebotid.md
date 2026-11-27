---
layout: doc
title: $voteBotID[]
translation_key: docs
category: "Webhooks"
function_name: voteBotID
syntax: $voteBotID
description: "ID of the bot that was voted for, from a Top.gg vote webhook. Read from the body of an inbound webhook."
---
# $voteBotID — ID of the bot that was voted for, from a Top.gg vote webhook. Read from the body of an inbound webhook.

## Syntax

```
$voteBotID
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$voteBotID → result
```

## Example

```bdfd
$sendMessage[$voteBotID]
```
