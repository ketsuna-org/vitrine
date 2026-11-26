---
layout: doc
title: $createNeuQuant[]
translation_key: docs
category: "Image & Canvas"
function_name: createNeuQuant
syntax: $createNeuQuant[name;sample;maxColors;pixels]
description: "Creates a NeuQuant color quantizer from RGBA pixels (sample 1 to 30, 2 to 256 colors). (alias of $newNeuQuant)"
---
# $createNeuQuant — Creates a NeuQuant color quantizer from RGBA pixels (sample 1 to 30, 2 to 256 colors). (alias of $newNeuQuant)

## Syntax

```
$createNeuQuant[name;sample;maxColors;pixels]
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
$createNeuQuant[name;sample;maxColors;pixels] → result
```

## Example

```bdfd
$sendMessage[$createNeuQuant[name;sample;maxColors;pixels]]
```
