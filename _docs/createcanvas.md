---
layout: doc
title: $createCanvas[]
translation_key: docs
category: "Image & Canvas"
function_name: createCanvas
syntax: $createCanvas[name;width;height;(code)]
description: "Creates a canvas and makes it the current one; the optional code runs right away."
---
# $createCanvas — Creates a canvas and makes it the current one; the optional code runs right away.

## Syntax

```
$createCanvas[name;width;height;(code)]
```

## Parameters

- **name** *(String, required)* — Canvas name
- **width** *(Number, required)* — Width in pixels
- **height** *(Number, required)* — Height in pixels
- **code** *(String, optional)* — Code to run once the canvas exists

## Return Value

- None.

## Usage

```
$createCanvas[name;width;height;code] → result
```

## Example

```bdfd
$sendMessage[$createCanvas[name;width;height;code]]
```
