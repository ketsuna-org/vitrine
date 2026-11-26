---
layout: doc
title: $playerElapsedTime[]
translation_key: docs
category: "Music"
function_name: playerElapsedTime
syntax: $playerElapsedTime
description: "Elapsed time of the current track, in milliseconds."
---
# $playerElapsedTime — Elapsed time of the current track, in milliseconds.

## Syntax

```
$playerElapsedTime
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$playerElapsedTime → result
```

## Example

```bdfd
$sendMessage[$playerElapsedTime]
```
