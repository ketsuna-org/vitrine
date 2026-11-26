---
layout: doc
title: $memberHighestRoleID[]
translation_key: docs
category: "Entity Info"
function_name: memberHighestRoleID
syntax: $memberHighestRoleID[guildID;userID]
description: "Returns the highest role id of a member."
---
# $memberHighestRoleID — Returns the highest role id of a member.

## Syntax

```
$memberHighestRoleID[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to get its highest role id

## Return Value

- Role.

## Usage

```
$memberHighestRoleID[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$memberHighestRoleID]
```
