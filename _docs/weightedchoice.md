---
layout: doc
title: $weightedChoice[]
translation_key: docs
category: "Lists & Helpers"
function_name: weightedChoice
syntax: $weightedChoice[items;weights;(separator)]
description: "Picks one item at random, the heavier the weight the likelier it is (drops, lotteries)."
---
# $weightedChoice — Picks one item at random, the heavier the weight the likelier it is (drops, lotteries)

## Syntax

```
$weightedChoice[items;weights;(separator)]
```

## Parameters

- **items** *(text, required)* — The items.
- **weights** *(text, required)* — One non negative number per item, same separator.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string: the item, or empty when there is nothing to pick.

## Usage

```
$weightedChoice[common,rare,epic;70,25,5]
```

## Important Notes

- Items and weights must have the same count.

## Example

```bdfd
$sendMessage[$weightedChoice[common,rare,epic;70,25,5]]
```
