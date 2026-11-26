---
layout: doc
title: $memberBoostingSince[]
translation_key: docs
category: "Entity Info"
function_name: memberBoostingSince
syntax: $memberBoostingSince[guildID;userID]
description: "Returns when the member started boosting the guild."
---
# $memberBoostingSince — Returns when the member started boosting the guild.

## Syntax

```
$memberBoostingSince[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to check boost status for

## Return Value

- Number.

## Usage

```
$memberBoostingSince[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$memberBoostingSince]
```
