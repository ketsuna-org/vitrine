---
layout: doc
title: $randomString[]
translation_key: docs
category: "Math & Text"
function_name: randomString
syntax: $randomString[length]
description: Generates a random alphanumeric string of the specified length.
---

# $randomString[]

The `$randomString[]` function generates a random alphanumeric character string of a given length.

## Syntax

```
$randomString[length]
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `length` | Required. An integer from `1` to `10` (surrounding spaces are ignored). Anything else (`0`, `11`, a decimal, text, empty) raises the error "Random string length must be an integer from 1 to 10.". |

## Return Value

A string of exactly `length` random alphanumeric characters (exactly one argument is accepted), containing:
- Lowercase letters (a-z)
- Uppercase letters (A-Z)
- Digits (0-9)

## Examples

### Generate a random identifier

```bdfd
$title[Your session ID]
$description[ID: `$randomString[8]`]
$footer[Keep this identifier]
```

### Verification code

```bdfd
Your verification code is: **$randomString[6]**
```

### Longest string

```bdfd
$randomString[10]
```

## Use cases

- Short random codes or labels (maximum length 10). Two calls can return the same string: uniqueness is not guaranteed.
