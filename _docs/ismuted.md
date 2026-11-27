---
layout: doc
title: $isMuted[]
translation_key: docs
category: "Entity Info"
function_name: isMuted
syntax: $isMuted[guildID;userID]
description: "Returns whether a member is muted."
---
# $isMuted — Returns whether a member is muted.

## Syntax

```
$isMuted[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to get its voice state

## Return Value

- Boolean.

## Usage

```
$isMuted[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isMuted]
```
