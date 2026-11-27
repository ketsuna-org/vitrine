---
layout: doc
title: $bar[]
translation_key: docs
category: "Formatting"
function_name: bar
syntax: $bar[current;max;(length);(fill);(empty);(trunc);(fillStart);(fillEnd);(emptyStart);(emptyEnd)]
description: "Generates a progress bar"
---
# $bar — Generates a progress bar

## Syntax

```
$bar[current;max;(length);(fill);(empty);(trunc);(fillStart);(fillEnd);(emptyStart);(emptyEnd)]
```

## Parameters

- **current** *(number, required)* — The current value
- **max** *(number, required)* — The max value of current
- **length** *(number, optional)* — The length of the bar
- **fill** *(text, optional)* — The string to use as filled points of the bar
- **empty** *(text, optional)* — The string to use as empty points of the bar
- **trunc** *(boolean, optional)* — Whether to truncate instead of round
- **fillStart** *(text, optional)* — The string to use as filled start of the bar
- **fillEnd** *(text, optional)* — The string to use as filled end of the bar
- **emptyStart** *(text, optional)* — The string to use as empty start of the bar
- **emptyEnd** *(text, optional)* — The string to use as empty end of the bar

## Return Value

- String.

## Usage

```
$bar[current;max;(length);(fill);(empty);(trunc);(fillStart);(fillEnd);(emptyStart);(emptyEnd)] → result
```

## Example

```bdfd
$sendMessage[$bar[3;10;10]]
```
