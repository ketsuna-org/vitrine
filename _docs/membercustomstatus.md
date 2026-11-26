---
layout: doc
title: $memberCustomStatus[]
translation_key: docs
category: "Entity Info"
function_name: memberCustomStatus
syntax: $memberCustomStatus[(guildID);(userID);(type)]
description: "Custom status text of the user who ran the command. Empty for another user."
---
# $memberCustomStatus — Custom status text of the user who ran the command. Empty for another user.

## Syntax

```
$memberCustomStatus[(guildID);(userID);(type)]
```

## Parameters

- **guildID** *(String, optional)* — Server ID (ignored)
- **userID** *(String, optional)* — User ID (empty: the author)
- **type** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$memberCustomStatus[guildID;userID;type] → result
```

## Example

```bdfd
$sendMessage[$memberCustomStatus[guildID;userID;type]]
```
