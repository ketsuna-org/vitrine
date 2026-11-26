---
layout: doc
title: $isKickable[]
translation_key: docs
category: "Entity Info"
function_name: isKickable
syntax: $isKickable[guildID;userID]
description: "Returns whether a member is kickable"
---
# $isKickable — Returns whether a member is kickable

## Syntax

```
$isKickable[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to check for

## Return Value

- Boolean.

## Usage

```
$isKickable[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isKickable[10;20]]
```
