---
layout: doc
title: $skipFrameDecoding[]
translation_key: docs
category: "Image & Canvas"
function_name: skipFrameDecoding
syntax: $skipFrameDecoding[name;boolean]
description: "Reads frames without their pixels."
---
# $skipFrameDecoding — Reads frames without their pixels.

## Syntax

```
$skipFrameDecoding[name;boolean]
```

## Parameters

- **name** *(String, required)* — Options name
- **boolean** *(Boolean, required)* — true or false

## Return Value

- None.

## Usage

```
$skipFrameDecoding[name;boolean] → result
```

## Example

```bdfd
$sendMessage[$skipFrameDecoding[name;boolean]]
```
