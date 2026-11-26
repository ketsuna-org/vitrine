---
layout: doc
title: $removeTrack[]
translation_key: docs
category: "Music"
function_name: removeTrack
syntax: $removeTrack[position]
description: "Removes the queued track at a position (0 is the next track)."
---
# $removeTrack — Removes the queued track at a position (0 is the next track).

## Syntax

```
$removeTrack[position]
```

## Parameters

- **position** *(Number, required)* — Position

## Return Value

- String.

## Usage

```
$removeTrack[position] → result
```

## Example

```bdfd
$sendMessage[$removeTrack[position]]
```
