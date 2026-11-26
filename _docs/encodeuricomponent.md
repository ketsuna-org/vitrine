---
layout: doc
title: $encodeURIComponent[]
translation_key: docs
category: "Math & Text"
function_name: encodeURIComponent
syntax: $encodeURIComponent[text]
description: "Encodes a URL part (also encodes `:/?#&=`)."
---
# $encodeURIComponent — Encodes a URL part (also encodes `:/?#&=`).

## Syntax

```
$encodeURIComponent[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$encodeURIComponent[a&b] → "a%26b"
```

## Example

```bdfd
$sendMessage[$encodeURIComponent[a&b]]
```
