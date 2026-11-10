---
layout: doc
title: $parseDuration[]
translation_key: docs
category: "Lists & Helpers"
function_name: parseDuration
syntax: $parseDuration[text;(unit)]
description: "Turns a written duration (`1h30m`, `2d`, `45s`) into a number of seconds."
---
# $parseDuration — Turns a written duration (`1h30m`, `2d`, `45s`) into a number of seconds

## Syntax

```
$parseDuration[text;(unit)]
```

## Parameters

- **text** *(text, required)* — Parts made of a number and a unit: `ms`, `s`, `m` (minutes), `h`, `d`, `w`. A bare number is seconds.
- **unit** *(`s` or `ms`, optional)* — Unit of the result. Default: `s`.

## Return Value

- number: empty when the text is not a valid duration.

## Usage

```
$parseDuration[1h30m] → "5400"
$parseDuration[2d 4h] → "187200"
$parseDuration[banana] → ""
```

## Important Notes

- Base of every `/timeout`, `/remind` or `/tempban` command: check for an empty result.

## Example

```bdfd
$sendMessage[$parseDuration[1h30m]]
```
