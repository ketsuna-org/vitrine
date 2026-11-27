---
layout: doc
title: $barOptions[]
translation_key: docs
category: "Image & Canvas"
function_name: barOptions
syntax: $barOptions[options]
description: "Sets progress bar options as key:value: type (normal, pie), draw-type (fill, stroke), background-style, background-radius, background-padding, background-type, radius, direction (horizontal, vertical). clip-radius, left and left-type are accepted and ignored; value none removes an option."
---
# $barOptions — Sets progress bar options as key:value: type (normal, pie), draw-type (fill, stroke), background-style, background-radius, background-padding, background-type, radius, direction (horizontal, vertical). clip-radius, left and left-type are accepted and ignored; value none removes an option.

## Syntax

```
$barOptions[options]
```

## Parameters

- **options** *(String, required)* — Options key:value

## Return Value

- None.

## Usage

```
$barOptions[options] → result
```

## Example

```bdfd
$sendMessage[$barOptions[options]]
```
