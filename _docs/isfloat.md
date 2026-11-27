---
layout: doc
title: $isFloat[]
translation_key: docs
category: "Math & Text"
function_name: isFloat
syntax: $isFloat[number]
description: "Tells whether a number has a decimal part."
---
# $isFloat — Tells whether a number has a decimal part.

## Syntax

```
$isFloat[number]
```

## Parameters

- **number** *(number, required)* — The value.

## Return Value

- string.

## Usage

```
$isFloat[1.5] → "true"
```

## Example

```bdfd
$sendMessage[$isFloat[1.5]]
```
