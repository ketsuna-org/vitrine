---
layout: doc
title: $seekTrack[]
translation_key: docs
category: "Music"
function_name: seekTrack
syntax: $seekTrack[duration]
description: "Seeks the current track: a time in milliseconds (15000) or with a unit (15s)."
---
# $seekTrack — Seeks the current track: a time in milliseconds (15000) or with a unit (15s).

## Syntax

```
$seekTrack[duration]
```

## Parameters

- **duration** *(String, required)* — Position

## Return Value

- None.

## Usage

```
$seekTrack[duration] → result
```

## Example

```bdfd
$sendMessage[$seekTrack[duration]]
```
