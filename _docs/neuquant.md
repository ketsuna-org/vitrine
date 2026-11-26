---
layout: doc
title: $NeuQuant[]
translation_key: docs
category: "Image & Canvas"
function_name: NeuQuant
syntax: $NeuQuant[name;sample;maxColors;pixels]
description: "Creates a NeuQuant color quantizer from RGBA pixels (sample 1 to 30, 2 to 256 colors). (alias of $newNeuQuant)"
---
# $NeuQuant — Creates a NeuQuant color quantizer from RGBA pixels (sample 1 to 30, 2 to 256 colors). (alias of $newNeuQuant)

## Syntax

```
$NeuQuant[name;sample;maxColors;pixels]
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
$NeuQuant[name;sample;maxColors;pixels] → result
```

## Example

```bdfd
$sendMessage[$NeuQuant[name;sample;maxColors;pixels]]
```
