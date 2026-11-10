---
layout: doc
title: $listUnique[]
translation_key: docs
category: "Lists & Helpers"
function_name: listUnique
syntax: $listUnique[list;(separator)]
description: "Removes duplicates and keeps the first occurrence of each item."
---
# $listUnique — Removes duplicates and keeps the first occurrence of each item

## Syntax

```
$listUnique[list;(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string.

## Usage

```
$listUnique[a,b,a,c,b] → "a,b,c"
```

## Example

```bdfd
$sendMessage[$listUnique[a,b,a,c,b]]
```
