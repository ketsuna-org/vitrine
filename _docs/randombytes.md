---
layout: doc
title: $randomBytes[]
translation_key: docs
category: "Math & Text"
function_name: randomBytes
syntax: $randomBytes[length]
description: "Random bytes as hexadecimal (0 to 1024 bytes)."
---
# $randomBytes — Random bytes as hexadecimal (0 to 1024 bytes).

## Syntax

```
$randomBytes[length]
```

## Parameters

- **length** *(number, required)* — Number of bytes.

## Return Value

- string.

## Usage

```
$randomBytes[4] → "9f3a01bc"
```

## Example

```bdfd
$sendMessage[$randomBytes[4]]
```
