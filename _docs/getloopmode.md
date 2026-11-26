---
layout: doc
title: $getLoopMode[]
translation_key: docs
category: "Music"
function_name: getLoopMode
syntax: $getLoopMode
description: "Loop mode of the queue: OFF, TRACK or QUEUE."
---
# $getLoopMode — Loop mode of the queue: OFF, TRACK or QUEUE.

## Syntax

```
$getLoopMode
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$getLoopMode → result
```

## Example

```bdfd
$sendMessage[$getLoopMode]
```
