---
layout: doc
title: $average[]
translation_key: docs
category: "Math & Text"
function_name: average
syntax: $average[number;...]
description: "Average of the given numbers, as a real decimal whatever `$enableDecimals` says."
---
# $average — Average of the given numbers, as a real decimal whatever `$enableDecimals` says.

## Syntax

```
$average[number;...]
```

## Parameters

- **number, ...** *(number, required)* — One or more numbers.

## Return Value

- string.

## Usage

```
$average[1;2;4] → "2.333333333333"
```

## Example

```bdfd
$sendMessage[$average[10;15;20]]
```
