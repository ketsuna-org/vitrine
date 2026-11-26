---
layout: doc
title: $userCustomStatus[]
translation_key: docs
category: "Entity Info"
function_name: userCustomStatus
syntax: $userCustomStatus[(guildID);(userID);(type)]
description: "Alias of $memberCustomStatus."
---
# $userCustomStatus — Alias of $memberCustomStatus.

## Syntax

```
$userCustomStatus[(guildID);(userID);(type)]
```

## Parameters

- **guildID** *(String, optional)* — Server ID (ignored)
- **userID** *(String, optional)* — User ID (empty: the author)
- **type** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$userCustomStatus[guildID;userID;type] → result
```

## Example

```bdfd
$sendMessage[$userCustomStatus[guildID;userID;type]]
```
