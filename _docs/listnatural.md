---
layout: doc
title: $listNatural[]
translation_key: docs
category: "Lists & Helpers"
function_name: listNatural
syntax: $listNatural[list;(separator);(lastSeparator);(outputSeparator)]
description: "Writes a list as a sentence: `a, b and c`."
---
# $listNatural — Writes a list as a sentence: `a, b and c`

## Syntax

```
$listNatural[list;(separator);(lastSeparator);(outputSeparator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.
- **lastSeparator** *(text, optional)* — Put before the last item. Default: ` and `.
- **outputSeparator** *(text, optional)* — Put between the other items. Default: `, `.

## Return Value

- string.

## Usage

```
$listNatural[a,b,c] → "a, b and c"
$listNatural[a,b,c;,; et ] → "a, b et c"
```

## Example

```bdfd
$sendMessage[$listNatural[a,b,c]]
```
