---
layout: doc
title: $skipFrameDecode[]
translation_key: docs
category: "Image & Canvas"
function_name: skipFrameDecode
syntax: $skipFrameDecode[name;boolean]
description: "Reads frames without their pixels. (alias of $skipFrameDecoding)"
---
# $skipFrameDecode — Reads frames without their pixels. (alias of $skipFrameDecoding)

## Syntax

```
$skipFrameDecode[name;boolean]
```

## Parameters

- **name** *(String, required)* — Options name
- **boolean** *(Boolean, required)* — true or false

## Return Value

- None.

## Usage

```
$skipFrameDecode[name;boolean] → result
```

## Example

```bdfd
$sendMessage[$skipFrameDecode[name;boolean]]
```
