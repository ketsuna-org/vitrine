---
layout: doc
title: $soundURL[]
translation_key: docs
category: "Soundboard"
function_name: soundURL
syntax: $soundURL[guildID;soundID]
description: "Returns the url of a sound"
---
# $soundURL — Returns the url of a sound

## Syntax

```
$soundURL[guildID;soundID]
```

## Parameters

- **guildID** *(id, required)* — The guild to get sound from
- **soundID** *(id, required)* — The sound to return its url

## Return Value

- URL.

## Usage

```
$soundURL[guildID;soundID] → result
```

## Example

```bdfd
$sendMessage[$soundURL[10;600]]
```
