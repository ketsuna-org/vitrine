---
layout: doc
title: $setVoiceMute[]
translation_key: docs
category: "Moderation"
function_name: setVoiceMute
syntax: $setVoiceMute[guildID;userID;(reason)]
description: "Mutes a member from voice channel."
---
# $setVoiceMute — Mutes a member from voice channel.

## Syntax

```
$setVoiceMute[guildID;userID;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to mute
- **reason** *(text, optional)* — The reason to mute this user

## Return Value

- Boolean.

## Usage

```
$setVoiceMute[guildID;userID;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setVoiceMute[10;20]]
```
