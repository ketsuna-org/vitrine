---
layout: doc
title: $removeDecoder[]
translation_key: docs
category: "Image & Canvas"
function_name: removeDecoder
syntax: $removeDecoder[name]
description: "Deletes a GIF decoder. (alias of $deleteDecoder)"
---
# $removeDecoder — Deletes a GIF decoder. (alias of $deleteDecoder)

## Syntax

```
$removeDecoder[name]
```

## Parameters

- **name** *(String, required)* — Decoder name

## Return Value

- None.

## Usage

```
$removeDecoder[name] → result
```

## Example

```bdfd
$sendMessage[$removeDecoder[name]]
```
