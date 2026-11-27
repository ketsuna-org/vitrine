---
layout: doc
title: $replaceRegex[]
translation_key: docs
category: "Math & Text"
function_name: replaceRegex
syntax: $replaceRegex[text;regex;flags;replacement;(amount)]
description: "Replaces text matching a regular expression."
---
# $replaceRegex — Replaces text matching a regular expression.

## Syntax

```
$replaceRegex[text;regex;flags;replacement;(amount)]
```

## Parameters

- **text** *(text, required)* — The text.
- **regex** *(text, required)* — The pattern.
- **flags** *(text, required)* — Flags: g, i, m, s, u.
- **replacement** *(text, required)* — Replacement; $1 inserts a group.
- **amount** *(number, optional)* — Maximum number of replacements.

## Return Value

- string.

## Usage

```
$replaceRegex[a1b2;[0-9];g;#] → "a#b#"
```

## Example

```bdfd
$sendMessage[$replaceRegex[a1b2;[0-9];g;#]]
```
