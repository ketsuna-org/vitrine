---
layout: doc
title: $reverseText[]
translation_key: docs
category: "Math & Text"
function_name: reverseText
syntax: $reverseText[text]
description: "Writes the text backwards."
---
# $reverseText — Writes the text backwards

## Syntax

```
$reverseText[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$reverseText[abc] → "cba"
```

## Example

```bdfd
$sendMessage[$reverseText[abc]]
```
