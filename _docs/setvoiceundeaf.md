---
layout: doc
title: $setVoiceUndeaf[]
translation_key: docs
category: "Moderation"
function_name: setVoiceUndeaf
syntax: $setVoiceUndeaf[guildID;userID;(reason)]
description: "Undeafens a member from voice channel."
---
# $setVoiceUndeaf — Undeafens a member from voice channel.

## Syntax

```
$setVoiceUndeaf[guildID;userID;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to undeafen
- **reason** *(text, optional)* — The reason to undeafen this user

## Return Value

- Boolean.

## Usage

```
$setVoiceUndeaf[guildID;userID;(reason)] → result
```

## Example

```bdfd
$sendMessage[$setVoiceUndeaf[10;20]]
```
