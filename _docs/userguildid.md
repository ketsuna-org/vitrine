---
layout: doc
title: $userGuildID[]
translation_key: docs
category: "Entity Info"
function_name: userGuildID
syntax: $userGuildID[userID]
description: "Returns the primary guild id of a user."
---
# $userGuildID — Returns the primary guild id of a user.

## Syntax

```
$userGuildID[userID]
```

## Parameters

- **userID** *(id, required)* — The user to get its primary guild

## Return Value

- Guild.

## Usage

```
$userGuildID[userID] → result
```

## Example

```bdfd
$sendMessage[$userGuildID]
```
