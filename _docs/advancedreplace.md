---
layout: doc
title: $advancedReplace[]
translation_key: docs
category: "Math & Text"
function_name: advancedReplace
syntax: $advancedReplace[text;match;replacement]
description: "Replaces several texts in one call."
---
# $advancedReplace — Replaces several texts in one call.

## Syntax

```
$advancedReplace[text;match;replacement]
```

## Parameters

- **text** *(text, required)* — The text.
- **match** *(text, required)* — Text to find.
- **replacement** *(text, required)* — Text that replaces it (then more match/replacement pairs).

## Return Value

- string.

## Usage

```
$advancedReplace[abc;a;1;b;2] → "12c"
```

## Example

```bdfd
$sendMessage[$advancedReplace[abc;a;1;b;2]]
```
