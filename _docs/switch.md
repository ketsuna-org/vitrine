---
layout: doc
title: $switch[]
translation_key: docs
category: "Control Flow"
function_name: switch
syntax: $switch[value;cases]
description: "Switch-case statement for javascript"
---
# $switch — Switch-case statement for javascript

## Syntax

```
$switch[value;cases]
```

## Parameters

- **value** *(text, required)* — The value to match with
- **cases** *(text, required)* — The cases to use ($case), use $case[default;...] to add a default case

## Return Value

- Unknown.

## Usage

```
$switch[value;cases] → result
```

## Example

```bdfd
$sendMessage[$switch[b;$case[a;one]$case[b;two]]]
```
