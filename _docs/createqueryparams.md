---
layout: doc
title: $createQueryParams[]
translation_key: docs
category: "HTTP & JSON"
function_name: createQueryParams
syntax: $createQueryParams[name;value]
description: "Builds a query string from name and value pairs."
---
# $createQueryParams — Builds a query string from name and value pairs.

## Syntax

```
$createQueryParams[name;value]
```

## Parameters

- **name** *(text, required)* — Parameter name.
- **value** *(text, required)* — Parameter value (then more pairs).

## Return Value

- string.

## Usage

```
$createQueryParams[a;1;b;x y] → "a=1&b=x+y"
```

## Example

```bdfd
$sendMessage[$createQueryParams[a;1;b;x y]]
```
