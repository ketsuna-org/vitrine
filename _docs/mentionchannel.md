---
layout: doc
title: $mentionChannel[]
translation_key: docs
category: "Lists & Helpers"
function_name: mentionChannel
syntax: $mentionChannel[channelID]
description: "Builds the mention of a channel from its ID (`<#ID>`)."
---
# $mentionChannel — Builds the mention of a channel from its ID (`<#ID>`)

## Syntax

```
$mentionChannel[channelID]
```

## Parameters

- **channelID** *(ID, required)* — A channel ID. An empty value gives an empty result.

## Return Value

- string: `<#channelID>`, or empty.

## Usage

```
$mentionChannel[123456789] → "<#123456789>"
```

## Important Notes

- Useful with a channel stored in a server variable: `$mentionChannel[$getGuildVar[logs]]` stays empty while the setting is not filled.

## Example

```bdfd
$sendMessage[$mentionChannel[123456789]]
```
