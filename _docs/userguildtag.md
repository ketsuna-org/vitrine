---
layout: doc
title: $userGuildTag[]
translation_key: docs
category: "Entity Info"
function_name: userGuildTag
syntax: $userGuildTag[userID]
description: "Returns the primary guild tag name of a user."
---
# $userGuildTag — Returns the primary guild tag name of a user.

## Syntax

```
$userGuildTag[userID]
```

## Parameters

- **userID** *(id, required)* — The user to get its primary guild

## Return Value

- String.

## Usage

```
$userGuildTag[userID] → result
```

## Example

```bdfd
$sendMessage[$userGuildTag]
```
