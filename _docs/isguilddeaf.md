---
layout: doc
title: $isGuildDeaf[]
translation_key: docs
category: "Entity Info"
function_name: isGuildDeaf
syntax: $isGuildDeaf[guildID;userID]
description: "Returns whether a member is server deafened."
---
# $isGuildDeaf — Returns whether a member is server deafened.

## Syntax

```
$isGuildDeaf[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to get its voice state

## Return Value

- Boolean.

## Usage

```
$isGuildDeaf[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isGuildDeaf]
```
