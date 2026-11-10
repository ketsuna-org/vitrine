---
layout: doc
title: $truncate[]
translation_key: docs
category: "Math & Text"
function_name: truncate
syntax: $truncate[text;max;(suffix)]
description: "Shortens a text so that it never exceeds a length, suffix included. `$cropText` is the older equivalent."
---
# $truncate — Shortens a text so that it never exceeds a length, suffix included

## Syntax

```
$truncate[text;max;(suffix)]
```

## Parameters

- **text** *(text, required)* — The text.
- **max** *(integer, required)* — Maximum length.
- **suffix** *(text, optional)* — Added when the text is cut. Default: `…`.

## Return Value

- string.

## Usage

```
$truncate[Hello world;8] → "Hello w…"
```

## Example

```bdfd
$sendMessage[$truncate[Hello world;8]]
```
