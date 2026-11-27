---
layout: doc
title: $targetMessage[]
translation_key: docs
category: "Interactions"
function_name: targetMessage
syntax: $targetMessage[property;(separator)]
description: "Property of the message a message context menu command was run on: id, content, authorID, channelID, guildID or url."
---
# $targetMessage — Property of the message a message context menu command was run on: id, content, authorID, channelID, guildID or url.

## Syntax

```
$targetMessage[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$targetMessage[property;separator] → result
```

## Example

```bdfd
$sendMessage[$targetMessage[property;separator]]
```
