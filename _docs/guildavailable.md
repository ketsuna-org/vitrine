---
layout: doc
title: $guildAvailable[]
translation_key: docs
category: "Entity Info"
function_name: guildAvailable
syntax: $guildAvailable[guildID]
description: "Returns whether the server is available."
---
# $guildAvailable — Returns whether the server is available.

## Syntax

```
$guildAvailable[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Boolean.

## Usage

```
$guildAvailable[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildAvailable]
```
