---
layout: doc
title: $listIndexOf[]
translation_key: docs
category: "Lists & Helpers"
function_name: listIndexOf
syntax: $listIndexOf[list;item;(separator)]
description: "Position of an item in a list (1 is the first), or 0 when it is absent."
---
# $listIndexOf — Position of an item in a list (1 is the first), or 0 when it is absent

## Syntax

```
$listIndexOf[list;item;(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **item** *(text, required)* — The item to find.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- number.

## Usage

```
$listIndexOf[a,b,c;b] → "2"
$listIndexOf[a,b;z] → "0"
```

## Example

```bdfd
$sendMessage[$listIndexOf[a,b,c;b]]
```
