---
layout: doc
title: $stopInterval[]
translation_key: docs
category: "Utilities"
function_name: stopInterval
syntax: $stopInterval[name]
description: "Alias of $clearInterval."
---
# $stopInterval — Alias of $clearInterval.

## Syntax

```
$stopInterval[name]
```

## Parameters

- **name** *(String, required)* — Timer name

## Return Value

- Boolean.

## Usage

```
$stopInterval[name] → result
```

## Example

```bdfd
$sendMessage[$stopInterval[name]]
```
