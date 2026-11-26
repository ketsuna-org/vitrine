---
layout: doc
title: $addDefaultUserOption[]
translation_key: docs
category: "Components & Interactions"
function_name: addDefaultUserOption
syntax: $addDefaultUserOption[userIDs...]
description: "Adds default user options to the last select menu"
---
# $addDefaultUserOption — Adds default user options to the last select menu

## Syntax

```
$addDefaultUserOption[userIDs...]
```

## Parameters

- **userIDs...** *(text, required)* — The user ids

## Return Value

- String.

## Usage

```
$addDefaultUserOption[userIDs...] → result
```

## Example

```bdfd
$addUserSelectMenu[u]$addDefaultUserOption[20]
```
