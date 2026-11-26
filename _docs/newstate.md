---
layout: doc
title: $newState[]
translation_key: docs
category: "Events"
function_name: newState
syntax: $newState[property;(separator)]
description: "State of the voice state after an update (voiceStateUpdate). Properties: channelID, authorID, deaf, guildDeaf, selfDeaf, muted, guildMuted, selfMuted."
---
# $newState — State of the voice state after an update (voiceStateUpdate). Properties: channelID, authorID, deaf, guildDeaf, selfDeaf, muted, guildMuted, selfMuted.

## Syntax

```
$newState[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$newState[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$newState[property;(separator)]]
```
