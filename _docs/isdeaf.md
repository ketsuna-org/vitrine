---
layout: doc
title: $isDeaf[]
translation_key: docs
category: "Entity Info"
function_name: isDeaf
syntax: $isDeaf[guildID;userID]
description: "Returns whether a member is deafened."
---
# $isDeaf — Returns whether a member is deafened.

## Syntax

```
$isDeaf[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to get its voice state

## Return Value

- Boolean.

## Usage

```
$isDeaf[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isDeaf]
```
