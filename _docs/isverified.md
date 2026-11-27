---
layout: doc
title: $isVerified[]
translation_key: docs
category: "Entity Info"
function_name: isVerified
syntax: $isVerified[guildID;userID]
description: "Returns whether a member is verified."
---
# $isVerified — Returns whether a member is verified.

## Syntax

```
$isVerified[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the member from
- **userID** *(id, required)* — The member to get its verified status

## Return Value

- Boolean.

## Usage

```
$isVerified[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$isVerified]
```
