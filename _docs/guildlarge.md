---
layout: doc
title: $guildLarge[]
translation_key: docs
category: "Entity Info"
function_name: guildLarge
syntax: $guildLarge[guildID]
description: "Returns whether a guild is considered as large."
---
# $guildLarge — Returns whether a guild is considered as large.

## Syntax

```
$guildLarge[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Boolean.

## Usage

```
$guildLarge[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildLarge]
```
