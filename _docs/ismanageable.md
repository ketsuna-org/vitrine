---
layout: doc
title: $isManageable[]
translation_key: docs
category: "Entity Info"
function_name: isManageable
syntax: $isManageable[guildID;userID]
description: "Returns whether a member is manageable"
---
# $isManageable — Returns whether a member is manageable

## Syntax

```
$isManageable[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to check for

## Return Value

- Boolean.

## Usage

```
$isManageable[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isManageable[10;20]]
```
