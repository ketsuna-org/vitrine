---
layout: doc
title: $isSelfMuted[]
translation_key: docs
category: "Entity Info"
function_name: isSelfMuted
syntax: $isSelfMuted[guildID;userID]
description: "Returns whether a member is self muted."
---
# $isSelfMuted — Returns whether a member is self muted.

## Syntax

```
$isSelfMuted[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to get its voice state

## Return Value

- Boolean.

## Usage

```
$isSelfMuted[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isSelfMuted]
```
