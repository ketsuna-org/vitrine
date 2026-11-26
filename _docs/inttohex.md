---
layout: doc
title: $intToHex[]
translation_key: docs
category: "Math & Text"
function_name: intToHex
syntax: $intToHex[number]
description: "Converts a number to hexadecimal."
---
# $intToHex — Converts a number to hexadecimal.

## Syntax

```
$intToHex[number]
```

## Parameters

- **number** *(number, required)* — The integer.

## Return Value

- string.

## Usage

```
$intToHex[255] → "ff"
```

## Example

```bdfd
$sendMessage[$intToHex[255]]
```
