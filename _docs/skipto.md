---
layout: doc
title: $skipTo[]
translation_key: docs
category: "Music"
function_name: skipTo
syntax: $skipTo[position]
description: "Jumps to the queued track at a position (0 is the next track): the tracks before it are dropped."
---
# $skipTo — Jumps to the queued track at a position (0 is the next track): the tracks before it are dropped.

## Syntax

```
$skipTo[position]
```

## Parameters

- **position** *(Number, required)* — Position

## Return Value

- None.

## Usage

```
$skipTo[position] → result
```

## Example

```bdfd
$sendMessage[$skipTo[position]]
```
