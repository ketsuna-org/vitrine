---
layout: doc
title: $memberLowestRoleID[]
translation_key: docs
category: "Entity Info"
function_name: memberLowestRoleID
syntax: $memberLowestRoleID[guildID;userID]
description: "Returns the lowest role id of a member."
---
# $memberLowestRoleID — Returns the lowest role id of a member.

## Syntax

```
$memberLowestRoleID[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to get its lowest role id

## Return Value

- Role.

## Usage

```
$memberLowestRoleID[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$memberLowestRoleID]
```
