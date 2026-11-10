---
layout: doc
title: $listLast[]
translation_key: docs
category: "Lists & Helpers"
function_name: listLast
syntax: $listLast[list;(separator)]
description: "Last item of a list, or empty."
---
# $listLast — Last item of a list, or empty

## Syntax

```
$listLast[list;(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string.

## Usage

```
$listLast[a,b] → "b"
```

## Example

```bdfd
$sendMessage[$listLast[a,b]]
```
