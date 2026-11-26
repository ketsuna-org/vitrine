---
layout: doc
title: $memberStatus[]
translation_key: docs
category: "Entity Info"
function_name: memberStatus
syntax: $memberStatus[(guildID);(userID)]
description: "Alias of $status."
---
# $memberStatus — Alias of $status.

## Syntax

```
$memberStatus[(guildID);(userID)]
```

## Parameters

- **guildID** *(String, optional)* — Server ID (ignored)
- **userID** *(String, optional)* — User ID (empty: the author)

## Return Value

- String.

## Usage

```
$memberStatus[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$memberStatus[guildID;userID]]
```
