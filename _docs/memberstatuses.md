---
layout: doc
title: $memberStatuses[]
translation_key: docs
category: "Entity Info"
function_name: memberStatuses
syntax: $memberStatuses[(guildID);(userID)]
description: "Alias of $status."
---
# $memberStatuses — Alias of $status.

## Syntax

```
$memberStatuses[(guildID);(userID)]
```

## Parameters

- **guildID** *(String, optional)* — Server ID (ignored)
- **userID** *(String, optional)* — User ID (empty: the author)

## Return Value

- String.

## Usage

```
$memberStatuses[guildID;userID] → result
```

## Example

```bdfd
$sendMessage[$memberStatuses[guildID;userID]]
```
