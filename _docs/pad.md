---
layout: doc
title: $pad[]
translation_key: docs
category: "Math & Text"
function_name: pad
syntax: $pad[text;length;(character);(side)]
description: "Completes a text up to a length, for example `7` → `007`."
---
# $pad — Completes a text up to a length, for example `7` → `007`

## Syntax

```
$pad[text;length;(character);(side)]
```

## Parameters

- **text** *(text, required)* — The text.
- **length** *(integer, required)* — Wanted length, 0 to 2000. A longer text is returned unchanged.
- **character** *(text, optional)* — Filler. Default: a space.
- **side** *(`left` or `right`, optional)* — Where to add the filler. Default: `left`.

## Return Value

- string.

## Usage

```
$pad[7;3;0] → "007"
$pad[ab;5;-;right] → "ab---"
```

## Example

```bdfd
$sendMessage[$pad[7;3;0]]
```
