---
layout: doc
title: $voiceMove[]
translation_key: docs
category: "Moderation"
function_name: voiceMove
syntax: $voiceMove[guildID;userID;(channelID);(reason)]
description: "Moves a member from a voice channel, returns bool."
---
# $voiceMove — Moves a member from a voice channel, returns bool.

## Syntax

```
$voiceMove[guildID;userID;(channelID);(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to move
- **channelID** *(id, optional)* — The voice channel to move this user to
- **reason** *(text, optional)* — The reason for moving the user

## Return Value

- Boolean.

## Usage

```
$voiceMove[guildID;userID;(channelID);(reason)] → result
```

## Example

```bdfd
$sendMessage[$voiceMove[10;20;32]]
```
