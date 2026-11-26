---
layout: doc
title: $segmentTextSplit[]
translation_key: docs
category: "Math & Text"
function_name: segmentTextSplit
syntax: $segmentTextSplit[text]
description: "Creates an array on given text using segmenter"
---
# $segmentTextSplit — Creates an array on given text using segmenter

## Syntax

```
$segmentTextSplit[text]
```

## Parameters

- **text** *(text, required)* — The text to split

## Return Value

- String.

## Usage

```
$segmentTextSplit[text] → result
```

## Example

```bdfd
$sendMessage[$segmentTextSplit[a👍🏽b]$splitTextJoin[-]]
```
