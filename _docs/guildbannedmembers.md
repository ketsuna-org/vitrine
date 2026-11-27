---
layout: doc
title: $guildBannedMembers[]
translation_key: docs
category: "Entity Info"
function_name: guildBannedMembers
syntax: $guildBannedMembers[guildID;(separator)]
description: "Returns banned member ids of a guild."
---
# $guildBannedMembers — Returns banned member ids of a guild.

## Syntax

```
$guildBannedMembers[guildID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull banned members from
- **separator** *(text, optional)* — The separator for each id

## Return Value

- User[].

## Usage

```
$guildBannedMembers[guildID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildBannedMembers[10;,]]
```
