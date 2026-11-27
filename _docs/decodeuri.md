---
layout: doc
title: $decodeURI[]
translation_key: docs
category: "Math & Text"
function_name: decodeURI
syntax: $decodeURI[text]
description: "Decodes a full URL."
---
# $decodeURI — Decodes a full URL.

## Syntax

```
$decodeURI[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$decodeURI[a%20b] → "a b"
```

## Example

```bdfd
$sendMessage[$decodeURI[a%20b]]
```
