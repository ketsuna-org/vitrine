---
layout: doc
title: $imageBuffer[]
translation_key: docs
category: "Image & Canvas"
function_name: imageBuffer
syntax: $imageBuffer[variable;path]
description: "Stores an image as base64 in a variable read with $env[name]."
---
# $imageBuffer — Stores an image as base64 in a variable read with $env[name].

## Syntax

```
$imageBuffer[variable;path]
```

## Parameters

- **variable** *(String, required)* — Variable name
- **path** *(String, required)* — Image source

## Return Value

- None.

## Usage

```
$imageBuffer[variable;path] → result
```

## Example

```bdfd
$sendMessage[$imageBuffer[variable;path]]
```
