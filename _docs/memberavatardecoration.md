---
layout: doc
title: $memberAvatarDecoration[]
translation_key: docs
category: "Entity Info"
function_name: memberAvatarDecoration
syntax: $memberAvatarDecoration[guildID;userID]
description: "Returns the member's avatar decoration."
---
# $memberAvatarDecoration — Returns the member's avatar decoration.

## Syntax

```
$memberAvatarDecoration[guildID;userID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull member from
- **userID** *(id, required)* — The user to get its avatar decoration

## Return Value

- URL.

## Usage

```
$memberAvatarDecoration[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[Value: $memberAvatarDecoration]
```
