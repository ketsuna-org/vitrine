---
layout: doc
title: $loadImage[]
translation_key: docs
category: "Image & Canvas"
function_name: loadImage
syntax: $loadImage[name;src]
description: "Gives a name to an image source (URL or data URL) for $drawImage; 32 names at most."
---
# $loadImage — Gives a name to an image source (URL or data URL) for $drawImage; 32 names at most.

## Syntax

```
$loadImage[name;src]
```

## Parameters

- **name** *(String, required)* — Image name
- **src** *(String, required)* — URL or data URL

## Return Value

- None.

## Usage

```
$loadImage[name;src] → result
```

## Example

```bdfd
$sendMessage[$loadImage[name;src]]
```
