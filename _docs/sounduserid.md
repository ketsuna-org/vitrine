---
layout: doc
title: $soundUserID[]
translation_key: docs
category: "Soundboard"
function_name: soundUserID
syntax: $soundUserID[guildID;soundID]
description: "Returns the user who created the sound"
---
# $soundUserID — Returns the user who created the sound

## Syntax

```
$soundUserID[guildID;soundID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sound from
- **soundID** *(id, required)* — The sound to return its creator

## Return Value

- User.

## Usage

```
$soundUserID[guildID;soundID] → result
```

## Example

```bdfd
$sendMessage[$soundUserID[10;600]]
```
