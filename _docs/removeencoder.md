---
layout: doc
title: $removeEncoder[]
translation_key: docs
category: "Image & Canvas"
function_name: removeEncoder
syntax: $removeEncoder[name]
description: "Deletes a GIF encoder. (alias of $deleteEncoder)"
---
# $removeEncoder — Deletes a GIF encoder. (alias of $deleteEncoder)

## Syntax

```
$removeEncoder[name]
```

## Parameters

- **name** *(String, required)* — Encoder name

## Return Value

- None.

## Usage

```
$removeEncoder[name] → result
```

## Example

```bdfd
$sendMessage[$removeEncoder[name]]
```
