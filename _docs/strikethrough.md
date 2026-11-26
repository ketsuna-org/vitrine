---
layout: doc
title: $strikethrough[]
translation_key: docs
category: "Formatting"
function_name: strikethrough
syntax: $strikethrough[text]
description: "Strikes the text through."
---
# $strikethrough — Strikes the text through.

## Syntax

```
$strikethrough[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$strikethrough[hi] → "~~hi~~"
```

## Example

```bdfd
$sendMessage[$strikethrough[hi]]
```
