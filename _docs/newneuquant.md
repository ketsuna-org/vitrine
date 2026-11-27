---
layout: doc
title: $newNeuQuant[]
translation_key: docs
category: "Image & Canvas"
function_name: newNeuQuant
syntax: $newNeuQuant[name;sample;maxColors;pixels]
description: "Creates a NeuQuant color quantizer from RGBA pixels (sample 1 to 30, 2 to 256 colors)."
---
# $newNeuQuant — Creates a NeuQuant color quantizer from RGBA pixels (sample 1 to 30, 2 to 256 colors).

## Syntax

```
$newNeuQuant[name;sample;maxColors;pixels]
```

## Parameters

- **name** *(String, required)* — Instance name
- **sample** *(Number, required)* — Sampling factor
- **maxColors** *(Number, required)* — Maximum colors
- **pixels** *(String, required)* — RGBA values

## Return Value

- None.

## Usage

```
$newNeuQuant[name;sample;maxColors;pixels] → result
```

## Example

```bdfd
$sendMessage[$newNeuQuant[name;sample;maxColors;pixels]]
```
