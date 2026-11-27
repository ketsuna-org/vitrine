---
layout: doc
title: $decoderOptions[]
translation_key: docs
category: "Image & Canvas"
function_name: decoderOptions
syntax: $decoderOptions[name;(options)]
description: "Creates a named set of GIF decode options. (alias of $decodeOptions)"
---
# $decoderOptions — Creates a named set of GIF decode options. (alias of $decodeOptions)

## Syntax

```
$decoderOptions[name;(options)]
```

## Parameters

- **name** *(String, required)* — Options name
- **options** *(String, optional)* — Ignored

## Return Value

- None.

## Usage

```
$decoderOptions[name;options] → result
```

## Example

```bdfd
$sendMessage[$decoderOptions[name;options]]
```
