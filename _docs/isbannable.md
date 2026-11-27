---
layout: doc
title: $isBannable[]
translation_key: docs
category: "Entity Info"
function_name: isBannable
syntax: $isBannable[guildID;userID]
description: "Returns whether a member is bannable"
---
# $isBannable — Returns whether a member is bannable

## Syntax

```
$isBannable[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to check for

## Return Value

- Boolean.

## Usage

```
$isBannable[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isBannable[10;20]]
```
