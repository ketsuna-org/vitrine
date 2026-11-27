---
layout: doc
title: $statuses[]
translation_key: docs
category: "Entity Info"
function_name: statuses
syntax: $statuses[(guildID);(userID)]
description: "Alias of $status."
---
# $statuses — Alias of $status.

## Syntax

```
$statuses[(guildID);(userID)]
```

## Parameters

- **guildID** *(String, optional)* — Server ID (ignored)
- **userID** *(String, optional)* — User ID (empty: the author)

## Return Value

- String.

## Usage

```
$statuses[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$statuses[guildID;userID]]
```
