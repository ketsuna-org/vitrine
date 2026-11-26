---
layout: doc
title: $voiceID[]
translation_key: docs
category: "Moderation"
function_name: voiceID
syntax: $voiceID[guildID;userID]
description: "Returns the voice channel id a member is connected to."
---
# $voiceID — Returns the voice channel id a member is connected to.

## Syntax

```
$voiceID[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The member to get its voice channel

## Return Value

- Channel.

## Usage

```
$voiceID[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[Value: $voiceID]
```
