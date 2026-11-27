---
layout: doc
title: $guildMemberIDs[]
translation_key: docs
category: "Entity Info"
function_name: guildMemberIDs
syntax: $guildMemberIDs[guildID;(separator)]
description: "Returns all cached member ids of a guild."
---
# $guildMemberIDs — Returns all cached member ids of a guild.

## Syntax

```
$guildMemberIDs[guildID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull members from
- **separator** *(text, optional)* — The separator to use for each member

## Return Value

- Member[].

## Usage

```
$guildMemberIDs[guildID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildMemberIDs[10;,]]
```
