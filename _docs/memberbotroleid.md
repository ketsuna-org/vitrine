---
layout: doc
title: $memberBotRoleID[]
translation_key: docs
category: "Entity Info"
function_name: memberBotRoleID
syntax: $memberBotRoleID[guildID;userID]
description: "Returns the managed bot role of a member, only available for bots."
---
# $memberBotRoleID — Returns the managed bot role of a member, only available for bots.

## Syntax

```
$memberBotRoleID[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to get the managed bot role from

## Return Value

- Role.

## Usage

```
$memberBotRoleID[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$memberBotRoleID[10;98]]
```
