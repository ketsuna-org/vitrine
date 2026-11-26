---
layout: doc
title: $escapeCode[]
translation_key: docs
category: "Control Flow"
function_name: escapeCode
syntax: $escapeCode[code]
description: "Code inside this function will not be executed"
---
# $escapeCode — Code inside this function will not be executed

## Syntax

```
$escapeCode[code]
```

## Parameters

- **code** *(text, required)* — The code to ignore

## Return Value

- String.

## Usage

```
$escapeCode[code] → result
```

## Example

```bdfd
$sendMessage[$escapeCode[$ping]]
```
