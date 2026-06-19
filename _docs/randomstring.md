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
| `length` | The length of the random string to generate (in number of characters). |

## Return Value

A string of random alphanumeric characters containing:
- Lowercase letters (a-z)
- Uppercase letters (A-Z)
- Digits (0-9)

## Examples

### Generate a unique identifier

```bdfd
$title[Your session ID]
$description[ID: `$randomString[8]`]
$footer[Keep this identifier]
```

### Verification code

```bdfd
Your verification code is: **$randomString[6]**
```

### Access token

```bdfd
$randomString[32]
```

## Use cases

- Generating unique identifiers for tickets, sessions, or keys.
- Creating verification codes or temporary passwords.
- Generating random tokens.
