---
layout: doc
title: $encodeURI[]
translation_key: docs
category: "Math & Text"
function_name: encodeURI
syntax: $encodeURI[text]
description: "Encodes a full URL (keeps `:/?#&=`)."
---
# $encodeURI — Encodes a full URL (keeps `:/?#&=`).

## Syntax

```
$encodeURI[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$encodeURI[a b] → "a%20b"
```

## Example

```bdfd
$sendMessage[$encodeURI[a b]]
```
