---
layout: doc
title: $stopTimeout[]
translation_key: docs
category: "Utilities"
function_name: stopTimeout
syntax: $stopTimeout[name]
description: "Alias of $clearTimeout."
---
# $stopTimeout — Alias of $clearTimeout.

## Syntax

```
$stopTimeout[name]
```

## Parameters

- **name** *(String, required)* — Timer name

## Return Value

- Boolean.

## Usage

```
$stopTimeout[name] → result
```

## Example

```bdfd
$sendMessage[$stopTimeout[name]]
```
