---
layout: doc
title: $attachGIF[]
translation_key: docs
category: "Image & Canvas"
function_name: attachGIF
syntax: $attachGIF[(gif);(name)]
description: "Attaches the GIF of an encoder to the response, as name.gif."
---
# $attachGIF — Attaches the GIF of an encoder to the response, as name.gif.

## Syntax

```
$attachGIF[(gif);(name)]
```

## Parameters

- **gif** *(String, optional)* — Encoder name (empty: the only one)
- **name** *(String, optional)* — File name (default animation)

## Return Value

- None.

## Usage

```
$attachGIF[gif;name] → result
```

## Example

```bdfd
$sendMessage[$attachGIF[gif;name]]
```
