---
layout: doc
title: $deleteEncoder[]
translation_key: docs
category: "Image & Canvas"
function_name: deleteEncoder
syntax: $deleteEncoder[name]
description: "Deletes a GIF encoder."
---
# $deleteEncoder — Deletes a GIF encoder.

## Syntax

```
$deleteEncoder[name]
```

## Parameters

- **name** *(String, required)* — Encoder name

## Return Value

- None.

## Usage

```
$deleteEncoder[name] → result
```

## Example

```bdfd
$sendMessage[$deleteEncoder[name]]
```
