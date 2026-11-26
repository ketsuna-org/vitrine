---
layout: doc
title: $decodeURIComponent[]
translation_key: docs
category: "Math & Text"
function_name: decodeURIComponent
syntax: $decodeURIComponent[text]
description: "Decodes a URL part."
---
# $decodeURIComponent — Decodes a URL part.

## Syntax

```
$decodeURIComponent[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$decodeURIComponent[a%26b] → "a&b"
```

## Example

```bdfd
$sendMessage[$decodeURIComponent[a%26b]]
```
