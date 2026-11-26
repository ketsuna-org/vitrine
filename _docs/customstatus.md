---
layout: doc
title: $customStatus[]
translation_key: docs
category: "Entity Info"
function_name: customStatus
syntax: $customStatus[(guildID);(userID);(type)]
description: "Alias of $memberCustomStatus."
---
# $customStatus — Alias of $memberCustomStatus.

## Syntax

```
$customStatus[(guildID);(userID);(type)]
```

## Parameters

- **guildID** *(String, optional)* — Server ID (ignored)
- **userID** *(String, optional)* — User ID (empty: the author)
- **type** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$customStatus[guildID;userID;type] → result
```

## Example

```bdfd
$sendMessage[$customStatus[guildID;userID;type]]
```
