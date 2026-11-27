---
layout: doc
title: $nextFrameInfo[]
translation_key: docs
category: "Image & Canvas"
function_name: nextFrameInfo
syntax: $nextFrameInfo[gif;name]
description: "Reads the next frame without its pixels: returns its info as JSON and keeps it in $env[name]."
---
# $nextFrameInfo — Reads the next frame without its pixels: returns its info as JSON and keeps it in $env[name].

## Syntax

```
$nextFrameInfo[gif;name]
```

## Parameters

- **gif** *(String, required)* — Decoder name
- **name** *(String, required)* — Variable name

## Return Value

- Json.

## Usage

```
$nextFrameInfo[gif;name] → result
```

## Example

```bdfd
$sendMessage[$nextFrameInfo[gif;name]]
```
