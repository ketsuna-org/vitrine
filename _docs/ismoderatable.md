---
layout: doc
title: $isModeratable[]
translation_key: docs
category: "Entity Info"
function_name: isModeratable
syntax: $isModeratable[guildID;userID]
description: "Returns whether a member is moderatable"
---
# $isModeratable — Returns whether a member is moderatable

## Syntax

```
$isModeratable[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to check for

## Return Value

- Boolean.

## Usage

```
$isModeratable[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isModeratable[10;20]]
```
