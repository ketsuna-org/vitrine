---
layout: doc
title: $userGuildEnabled[]
translation_key: docs
category: "Entity Info"
function_name: userGuildEnabled
syntax: $userGuildEnabled[userID]
description: "Returns whether the primary guild of a user is enabled."
---
# $userGuildEnabled — Returns whether the primary guild of a user is enabled.

## Syntax

```
$userGuildEnabled[userID]
```

## Parameters

- **userID** *(id, required)* — The user to get its primary guild

## Return Value

- Boolean.

## Usage

```
$userGuildEnabled[userID] → result
```

## Example

```bdfd
$sendMessage[$userGuildEnabled]
```
