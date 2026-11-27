---
layout: doc
title: $decodeOptions[]
translation_key: docs
category: "Image & Canvas"
function_name: decodeOptions
syntax: $decodeOptions[name;(options)]
description: "Creates a named set of GIF decode options."
---
# $decodeOptions — Creates a named set of GIF decode options.

## Syntax

```
$decodeOptions[name;(options)]
```

## Parameters

- **name** *(String, required)* — Options name
- **options** *(String, optional)* — Ignored

## Return Value

- None.

## Usage

```
$decodeOptions[name;options] → result
```

## Example

```bdfd
$sendMessage[$decodeOptions[name;options]]
```
