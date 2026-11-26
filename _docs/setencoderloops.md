---
layout: doc
title: $setEncoderLoops[]
translation_key: docs
category: "Image & Canvas"
function_name: setEncoderLoops
syntax: $setEncoderLoops[(gif);loops]
description: "Sets how many times the GIF loops (0: forever)."
---
# $setEncoderLoops — Sets how many times the GIF loops (0: forever).

## Syntax

```
$setEncoderLoops[(gif);loops]
```

## Parameters

- **gif** *(String, optional)* — Encoder name (empty: the only one)
- **loops** *(Number, required)* — Loops

## Return Value

- None.

## Usage

```
$setEncoderLoops[gif;loops] → result
```

## Example

```bdfd
$sendMessage[$setEncoderLoops[gif;loops]]
```
