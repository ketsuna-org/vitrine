---
layout: doc
title: $readNextFrame[]
translation_key: docs
category: "Image & Canvas"
function_name: readNextFrame
syntax: $readNextFrame[gif;name]
description: "Reads the next frame with its pixels into $env[name] (an object with delay, dispose, width, height, buffer)."
---
# $readNextFrame — Reads the next frame with its pixels into $env[name] (an object with delay, dispose, width, height, buffer).

## Syntax

```
$readNextFrame[gif;name]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **name** *(String, required)* — Variable name

## Return Value

- None.

## Usage

```
$readNextFrame[gif;name] → result
```

## Example

```bdfd
$sendMessage[$readNextFrame[gif;name]]
```
