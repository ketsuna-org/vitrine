---
layout: doc
title: $inlineCode[]
translation_key: docs
category: "Formatting"
function_name: inlineCode
syntax: $inlineCode[text]
description: "Puts the text in inline code."
---
# $inlineCode — Puts the text in inline code.

## Syntax

```
$inlineCode[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$inlineCode[hi] → "`hi`"
```

## Example

```bdfd
$sendMessage[$inlineCode[hi]]
```
