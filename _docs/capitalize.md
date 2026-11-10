---
layout: doc
title: $capitalize[]
translation_key: docs
category: "Math & Text"
function_name: capitalize
syntax: $capitalize[text]
description: "First letter in upper case, the rest in lower case."
---
# $capitalize — First letter in upper case, the rest in lower case

## Syntax

```
$capitalize[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$capitalize[hELLO wORLD] → "Hello world"
```

## Example

```bdfd
$sendMessage[$capitalize[hELLO wORLD]]
```
