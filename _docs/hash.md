---
layout: doc
title: $hash
translation_key: docs
category: "Math & Text"
function_name: hash
syntax: $hash[text;(algorithm);(modulo)]
description: "Deterministic digest of a text: the same text always gives the same result."
---

# $hash

Deterministic digest of a text: the same text always gives the same result.

## Syntax

```
$hash[text;(algorithm);(modulo)]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text to hash (UTF-8). |
| `algorithm` | Optional. `fnv1a` (default, unsigned 32-bit number), `crc32` (unsigned 32-bit number) or `sha256`. |
| `modulo` | Optional. Positive integer: the result is reduced to 0..modulo-1 (for `sha256`, from its first 48 bits). Without it `sha256` returns 64 hex characters. |

## Return Value

- string.

## Usage

```
$hash[abc;fnv1a] → "440920331"
$hash[abc;crc32] → "891568578"
$hash[abc;sha256;10]
```

## Example

```bdfd
$hash[$getVar[world_seed]:$getUserVar[x]:$getUserVar[y];fnv1a;100]
```

## Notes

JavaScript: `bc.math.hash(text, algorithm, modulo)`. Same values in both.
