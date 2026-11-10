---
layout: doc
title: $progressBar[]
translation_key: docs
category: "Lists & Helpers"
function_name: progressBar
syntax: $progressBar[value;max;(length);(filled);(empty)]
description: "Draws a progress bar with text characters, with no image."
---
# $progressBar — Draws a progress bar with text characters, with no image

## Syntax

```
$progressBar[value;max;(length);(filled);(empty)]
```

## Parameters

- **value** *(number, required)* — Current value.
- **max** *(number, required)* — Maximum value. A maximum of 0 or less gives an empty bar.
- **length** *(integer, optional)* — Number of characters, 1 to 100. Default: 10.
- **filled** *(text, optional)* — Character of the filled part. Default: `▰`.
- **empty** *(text, optional)* — Character of the empty part. Default: `▱`.

## Return Value

- string.

## Usage

```
$progressBar[5;10;10] → "▰▰▰▰▰▱▱▱▱▱"
```

## Example

```bdfd
$sendMessage[$progressBar[5;10;10]]
```
