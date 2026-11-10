---
layout: doc
title: $wordCount[]
translation_key: docs
category: "Math & Text"
function_name: wordCount
syntax: $wordCount[text]
description: "Number of words (blocks of text separated by spaces or new lines)."
---
# $wordCount — Number of words (blocks of text separated by spaces or new lines)

## Syntax

```
$wordCount[text]
```

## Parameters

- **text** *(text, required)* — The text.

## Return Value

- number.

## Usage

```
$wordCount[one two  three] → "3"
```

## Example

```bdfd
$sendMessage[$wordCount[one two  three]]
```
