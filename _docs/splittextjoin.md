---
layout: doc
title: $splitTextJoin[]
translation_key: docs
category: "Math & Text"
function_name: splitTextJoin
syntax: $splitTextJoin[separator]
description: "Joins all elements from array with given separator"
---
# $splitTextJoin — Joins all elements from array with given separator

## Syntax

```
$splitTextJoin[separator]
```

## Parameters

- **separator** *(text, required)* — The separator to use for every element

## Return Value

- Unknown[].

## Usage

```
$splitTextJoin[separator] → result
```

## Example

```bdfd
$sendMessage[$segmentTextSplit[abc]$splitTextJoin[|]]
```
