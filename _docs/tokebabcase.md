---
layout: doc
title: $toKebabCase[]
translation_key: docs
category: "Math & Text"
function_name: toKebabCase
syntax: $toKebabCase[text]
description: "Converts text to kebab-case."
---
# $toKebabCase — Converts text to kebab-case.

## Syntax

```
$toKebabCase[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$toKebabCase[Hello big world] → "hello-big-world"
```

## Example

```bdfd
$sendMessage[$toKebabCase[Hello big world]]
```
