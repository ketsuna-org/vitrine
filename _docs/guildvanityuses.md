---
layout: doc
title: $guildVanityUses[]
translation_key: docs
category: "Entity Info"
function_name: guildVanityUses
syntax: $guildVanityUses[guildID]
description: "Returns the guilds vanity uses."
---
# $guildVanityUses — Returns the guilds vanity uses.

## Syntax

```
$guildVanityUses[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to return its vanity uses

## Return Value

- Number.

## Usage

```
$guildVanityUses[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildVanityUses]
```
