---
layout: doc
title: $fontFamilies[]
translation_key: docs
category: "Image & Canvas"
function_name: fontFamilies
syntax: $fontFamilies[(separator)]
description: "Lists the fonts the canvas can draw (Geist, Geist-Medium, Geist-Bold)."
---
# $fontFamilies — Lists the fonts the canvas can draw (Geist, Geist-Medium, Geist-Bold).

## Syntax

```
$fontFamilies[(separator)]
```

## Parameters

- **separator** *(String, optional)* — Separator (default ", ")

## Return Value

- String.

## Usage

```
$fontFamilies[separator] → result
```

## Example

```bdfd
$sendMessage[$fontFamilies[separator]]
```
