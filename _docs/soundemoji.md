---
layout: doc
title: $soundEmoji[]
translation_key: docs
category: "Soundboard"
function_name: soundEmoji
syntax: $soundEmoji[guildID;soundID]
description: "Returns the emoji of a sound"
---
# $soundEmoji — Returns the emoji of a sound

## Syntax

```
$soundEmoji[guildID;soundID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sound from
- **soundID** *(id, required)* — The sound to return its emoji

## Return Value

- String.

## Usage

```
$soundEmoji[guildID;soundID] → result
```

## Example

```bdfd
$sendMessage[$soundEmoji[10;600]]
```
