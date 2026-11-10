---
layout: doc
title: $trunc[]
translation_key: docs
category: "Math & Text"
function_name: trunc
syntax: $trunc[number]
description: "Removes the decimal part without rounding (`-3.9` becomes `-3`). The text version is `$truncate`."
---
# $trunc — Removes the decimal part without rounding (`-3.9` becomes `-3`). The text version is `$truncate`.

## Syntax

```
$trunc[number]
```

## Parameters

- **number** *(number, required)* — The number.

## Return Value

- string.

## Usage

```
$trunc[-3.9] → "-3"
```

## Example

```bdfd
$sendMessage[$trunc[3.9]]
```
