---
layout: doc
title: $guildMaximumMembers[]
translation_key: docs
category: "Entity Info"
function_name: guildMaximumMembers
syntax: $guildMaximumMembers[guildID]
description: "Returns the maximum members for this guild."
---
# $guildMaximumMembers — Returns the maximum members for this guild.

## Syntax

```
$guildMaximumMembers[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Number.

## Usage

```
$guildMaximumMembers[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildMaximumMembers]
```
