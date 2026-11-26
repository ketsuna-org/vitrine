---
layout: doc
title: $deleteFrame[]
translation_key: docs
category: "Image & Canvas"
function_name: deleteFrame
syntax: $deleteFrame[name]
description: "Deletes a created frame."
---
# $deleteFrame — Deletes a created frame.

## Syntax

```
$deleteFrame[name]
```

## Parameters

- **name** *(String, required)* — Frame name

## Return Value

- None.

## Usage

```
$deleteFrame[name] → result
```

## Example

```bdfd
$sendMessage[$deleteFrame[name]]
```
