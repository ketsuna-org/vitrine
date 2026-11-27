---
layout: doc
title: $moveTrack[]
translation_key: docs
category: "Music"
function_name: moveTrack
syntax: $moveTrack[position;newPosition]
description: "Moves a queued track to a new position (0 is the next track)."
---
# $moveTrack — Moves a queued track to a new position (0 is the next track).

## Syntax

```
$moveTrack[position;newPosition]
```

## Parameters

- **position** *(Number, required)* — Position
- **newPosition** *(Number, required)* — New position

## Return Value

- String.

## Usage

```
$moveTrack[position;newPosition] → result
```

## Example

```bdfd
$sendMessage[$moveTrack[position;newPosition]]
```
