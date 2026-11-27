---
layout: doc
title: $setVoiceDeaf[]
translation_key: docs
category: "Moderation"
function_name: setVoiceDeaf
syntax: $setVoiceDeaf[guildID;userID;(reason)]
description: "Deafens a member from voice channel."
---
# $setVoiceDeaf — Deafens a member from voice channel.

## Syntax

```
$setVoiceDeaf[guildID;userID;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to deafen
- **reason** *(text, optional)* — The reason to deafen this user

## Return Value

- Boolean.

## Usage

```
$setVoiceDeaf[guildID;userID;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setVoiceDeaf[10;20]]
```
