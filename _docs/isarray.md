---
layout: doc
title: $isArray[]
translation_key: docs
category: "Lists & Helpers"
function_name: isArray
syntax: $isArray[value]
description: "Tells whether a name or a JSON text is an array."
---
# $isArray — Tells whether a name or a JSON text is an array.

## Syntax

```
$isArray[value]
```

## Parameters

- **value** *(text, required)* — Array name or JSON text.

## Return Value

- string.

## Usage

```
$isArray[[1,2]] → "true"
```

## Example

```bdfd
$sendMessage[$isArray[[1,2]]]
```
