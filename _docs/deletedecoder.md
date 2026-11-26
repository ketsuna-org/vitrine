---
layout: doc
title: $deleteDecoder[]
translation_key: docs
category: "Image & Canvas"
function_name: deleteDecoder
syntax: $deleteDecoder[name]
description: "Deletes a GIF decoder."
---
# $deleteDecoder — Deletes a GIF decoder.

## Syntax

```
$deleteDecoder[name]
```

## Parameters

- **name** *(String, required)* — Decoder name

## Return Value

- None.

## Usage

```
$deleteDecoder[name] → result
```

## Example

```bdfd
$sendMessage[$deleteDecoder[name]]
```
