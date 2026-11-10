---
layout: doc
title: $listFirst[]
translation_key: docs
category: "Lists & Helpers"
function_name: listFirst
syntax: $listFirst[list;(separator)]
description: "First item of a list, or empty."
---
# $listFirst — First item of a list, or empty

## Syntax

```
$listFirst[list;(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string.

## Usage

```
$listFirst[a,b] → "a"
```

## Example

```bdfd
$sendMessage[$listFirst[a,b]]
```
