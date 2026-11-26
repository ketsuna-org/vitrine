---
layout: doc
title: $drawProgressBar[]
translation_key: docs
category: "Image & Canvas"
function_name: drawProgressBar
syntax: $drawProgressBar[(canvas);x;y;width;height;(config)]
description: "Draws a progress bar (or a pie chart with type:pie) from $barData and $barOptions."
---
# $drawProgressBar — Draws a progress bar (or a pie chart with type:pie) from $barData and $barOptions.

## Syntax

```
$drawProgressBar[(canvas);x;y;width;height;(config)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **x** *(Number, required)* — X
- **y** *(Number, required)* — Y
- **width** *(Number, required)* — Width
- **height** *(Number, required)* — Height
- **config** *(String, optional)* — Ignored

## Return Value

- None.

## Usage

```
$drawProgressBar[canvas;x;y;width;height;config] → result
```

## Example

```bdfd
$sendMessage[$drawProgressBar[canvas;x;y;width;height;config]]
```
