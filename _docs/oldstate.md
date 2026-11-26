---
layout: doc
title: $oldState[]
translation_key: docs
category: "Events"
function_name: oldState
syntax: $oldState[property;(separator)]
description: "Previous state of the voice state before an update (voiceStateUpdate). Properties: channelID, authorID, deaf, guildDeaf, selfDeaf, muted, guildMuted, selfMuted."
---
# $oldState — Previous state of the voice state before an update (voiceStateUpdate). Properties: channelID, authorID, deaf, guildDeaf, selfDeaf, muted, guildMuted, selfMuted.

## Syntax

```
$oldState[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read; see the list above
- **separator** *(String, optional)* — Separator for list values (default comma)

## Return Value

- String.

## Usage

```
$oldState[property;(separator)] → value
```

## Example

```bdfd
$sendMessage[$oldState[property;(separator)]]
```
