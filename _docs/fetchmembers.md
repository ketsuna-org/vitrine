---
layout: doc
title: $fetchMembers[]
translation_key: docs
category: "Entity Info"
function_name: fetchMembers
syntax: $fetchMembers[guildID;(userID)]
description: "Caches all members of a guild."
---
# $fetchMembers — Caches all members of a guild.

## Syntax

```
$fetchMembers[guildID;(userID)]
```

## Parameters

- **guildID** *(id, required)* — The guild to cache members of
- **userID** *(id, optional)* — The member to fetch

## Return Value

- string.

## Usage

```
$fetchMembers[guildID;(userID)] → result
```

## Example

```bdfd
$fetchMembers[10]
$sendMessage[Done]
```
