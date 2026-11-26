---
layout: doc
title: $return[]
translation_key: docs
category: "Control Flow"
function_name: return
syntax: $return[value]
description: "Returns a value"
---
# $return — Returns a value

## Syntax

```
$return[value]
```

## Parameters

- **value** *(text, required)* — The value to return

## Return Value

- Unknown.

## Usage

```
$return[value] → result
```

## Example

```bdfd
$sendMessage[$localFunction[f;a$return[b]c;x]$callLocalFunction[f;1]]
```
