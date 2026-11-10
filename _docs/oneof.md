---
layout: doc
title: $oneOf[]
translation_key: docs
category: "Lists & Helpers"
function_name: oneOf
syntax: $oneOf[value;option1;option2;...]
description: "Tells whether a value equals one of the options."
---
# $oneOf — Tells whether a value equals one of the options

## Syntax

```
$oneOf[value;option1;option2;...]
```

## Parameters

- **value** *(text, required)* — The value.
- **option** *(text, required, repeatable)* — The accepted values.

## Return Value

- `true` or `false`.

## Usage

```
$oneOf[b;a;b;c] → "true"
```

## Example

```bdfd
$sendMessage[$oneOf[b;a;b;c]]
```
