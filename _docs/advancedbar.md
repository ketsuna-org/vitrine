---
layout: doc
title: $advancedBar[]
translation_key: docs
category: "Formatting"
function_name: advancedBar
syntax: $advancedBar[current;max;(length);values...]
description: "Generates an advanced progress bar"
---
# $advancedBar — Generates an advanced progress bar

## Syntax

```
$advancedBar[current;max;(length);values...]
```

## Parameters

- **current** *(number, required)* — The current value
- **max** *(number, required)* — The max value of current
- **length** *(number, optional)* — The length of the bar
- **values...** *(text, required)* — The values to make the bar with, for example `=;~;#` means `0%;33%;66%`

## Return Value

- String.

## Usage

```
$advancedBar[current;max;(length);values...] → result
```

## Example

```bdfd
$sendMessage[$advancedBar[5;10;4;=;~;#]]
```
