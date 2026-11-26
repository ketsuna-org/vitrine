---
layout: doc
title: $memberJoinPosition[]
translation_key: docs
category: "Entity Info"
function_name: memberJoinPosition
syntax: $memberJoinPosition[guildID;userID]
description: "Returns the position at which the member joined the guild"
---
# $memberJoinPosition — Returns the position at which the member joined the guild

## Syntax

```
$memberJoinPosition[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to get its join position

## Return Value

- Number.

## Usage

```
$memberJoinPosition[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$memberJoinPosition[10;20]]
```
