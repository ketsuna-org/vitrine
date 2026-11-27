---
layout: doc
title: $isSelfDeaf[]
translation_key: docs
category: "Entity Info"
function_name: isSelfDeaf
syntax: $isSelfDeaf[guildID;userID]
description: "Returns whether a member is self deafened."
---
# $isSelfDeaf — Returns whether a member is self deafened.

## Syntax

```
$isSelfDeaf[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to get its voice state

## Return Value

- Boolean.

## Usage

```
$isSelfDeaf[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isSelfDeaf]
```
