---
layout: doc
title: $voiceKick[]
translation_key: docs
category: "Moderation"
function_name: voiceKick
syntax: $voiceKick[guildID;userID;(reason)]
description: "Kicks a member from a voice channel, returns bool."
---
# $voiceKick — Kicks a member from a voice channel, returns bool.

## Syntax

```
$voiceKick[guildID;userID;(reason)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to kick
- **reason** *(text, optional)* — The reason to kick this user

## Return Value

- Boolean.

## Usage

```
$voiceKick[guildID;userID;(reason)] → result
```

## Example

```bdfd
$sendMessage[$voiceKick[10;20]]
```
