---
layout: doc
title: $isGuildMuted[]
translation_key: docs
category: "Entity Info"
function_name: isGuildMuted
syntax: $isGuildMuted[guildID;userID]
description: "Returns whether a member is server muted."
---
# $isGuildMuted — Returns whether a member is server muted.

## Syntax

```
$isGuildMuted[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to get its voice state

## Return Value

- Boolean.

## Usage

```
$isGuildMuted[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isGuildMuted]
```
