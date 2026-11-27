---
layout: doc
title: $setVoiceUnmute[]
translation_key: docs
category: "Moderation"
function_name: setVoiceUnmute
syntax: $setVoiceUnmute[guildID;userID;(reason)]
description: "Unmutes a member from voice channel."
---
# $setVoiceUnmute — Unmutes a member from voice channel.

## Syntax

```
$setVoiceUnmute[guildID;userID;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to unmute
- **reason** *(text, optional)* — The reason to unmute this user

## Return Value

- Boolean.

## Usage

```
$setVoiceUnmute[guildID;userID;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setVoiceUnmute[10;20]]
```
