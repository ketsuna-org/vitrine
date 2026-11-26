---
layout: doc
title: $soundCreatedAt[]
translation_key: docs
category: "Soundboard"
function_name: soundCreatedAt
syntax: $soundCreatedAt[guildID;soundID]
description: "Returns the creation timestamp of a sound"
---
# $soundCreatedAt — Returns the creation timestamp of a sound

## Syntax

```
$soundCreatedAt[guildID;soundID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sound from
- **soundID** *(id, required)* — The sound to return its creation timestamp

## Return Value

- Number.

## Usage

```
$soundCreatedAt[guildID;soundID] → result
```

## Example

```bdfd
$sendMessage[$soundCreatedAt[10;600]]
```
