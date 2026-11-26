---
layout: doc
title: $underline[]
translation_key: docs
category: "Formatting"
function_name: underline
syntax: $underline[text]
description: "Underlines the text."
---
# $underline — Underlines the text.

## Syntax

```
$underline[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- string.

## Usage

```
$underline[hi] → "__hi__"
```

## Example

```bdfd
$sendMessage[$underline[hi]]
```
