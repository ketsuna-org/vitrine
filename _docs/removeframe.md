---
layout: doc
title: $removeFrame[]
translation_key: docs
category: "Image & Canvas"
function_name: removeFrame
syntax: $removeFrame[name]
description: "Deletes a created frame. (alias of $deleteFrame)"
---
# $removeFrame — Deletes a created frame. (alias of $deleteFrame)

## Syntax

```
$removeFrame[name]
```

## Parameters

- **name** *(String, required)* — Frame name

## Return Value

- None.

## Usage

```
$removeFrame[name] → result
```

## Example

```bdfd
$sendMessage[$removeFrame[name]]
```
