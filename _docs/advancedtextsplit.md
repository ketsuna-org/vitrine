---
layout: doc
title: $advancedTextSplit[]
translation_key: docs
category: "Math & Text"
function_name: advancedTextSplit
syntax: $advancedTextSplit[text;split...]
description: "Split and get all at the same time multiple times"
---
# $advancedTextSplit — Split and get all at the same time multiple times

## Syntax

```
$advancedTextSplit[text;split...]
```

## Parameters

- **text** *(text, required)* — The text to use
- **split...** *(text, required)* — The split followed by the index to get

## Return Value

- String.

## Usage

```
$advancedTextSplit[text;split...] → result
```

## Example

```bdfd
$sendMessage[$advancedTextSplit[a-b,c-d;,;1;-;0]]
```
