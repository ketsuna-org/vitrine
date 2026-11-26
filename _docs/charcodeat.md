---
layout: doc
title: $charCodeAt[]
translation_key: docs
category: "Math & Text"
function_name: charCodeAt
syntax: $charCodeAt[text;index]
description: "Returns the UTF-16 code of the character at an index (NaN when out of range)."
---
# $charCodeAt — Returns the UTF-16 code of the character at an index (NaN when out of range).

## Syntax

```
$charCodeAt[text;index]
```

## Parameters

- **text** *(text, required)* — The text.
- **index** *(number, required)* — Zero-based position.

## Return Value

- string.

## Usage

```
$charCodeAt[A;0] → "65"
```

## Example

```bdfd
$sendMessage[$charCodeAt[A;0]]
```
