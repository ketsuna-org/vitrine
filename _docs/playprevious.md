---
layout: doc
title: $playPrevious[]
translation_key: docs
category: "Music"
function_name: playPrevious
syntax: $playPrevious
description: "Plays the previous track again (the last one of the history); the current track goes back to the front of the queue."
---
# $playPrevious — Plays the previous track again (the last one of the history); the current track goes back to the front of the queue.

## Syntax

```
$playPrevious
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$playPrevious → result
```

## Example

```bdfd
$sendMessage[$playPrevious]
```
