---
layout: doc
title: $setLoopMode[]
translation_key: docs
category: "Music"
function_name: setLoopMode
syntax: $setLoopMode[mode]
description: "Sets the loop mode: off, track or queue."
---
# $setLoopMode — Sets the loop mode: off, track or queue.

## Syntax

```
$setLoopMode[mode]
```

## Parameters

- **mode** *(String, required)* — Mode

## Return Value

- None.

## Usage

```
$setLoopMode[mode] → result
```

## Example

```bdfd
$sendMessage[$setLoopMode[mode]]
```
