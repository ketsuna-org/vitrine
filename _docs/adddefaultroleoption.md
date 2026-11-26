---
layout: doc
title: $addDefaultRoleOption[]
translation_key: docs
category: "Components & Interactions"
function_name: addDefaultRoleOption
syntax: $addDefaultRoleOption[roleIDs...]
description: "Adds default role options to the last select menu"
---
# $addDefaultRoleOption — Adds default role options to the last select menu

## Syntax

```
$addDefaultRoleOption[roleIDs...]
```

## Parameters

- **roleIDs...** *(text, required)* — The role ids

## Return Value

- String.

## Usage

```
$addDefaultRoleOption[roleIDs...] → result
```

## Example

```bdfd
$addRoleSelectMenu[r]$addDefaultRoleOption[70]
```
