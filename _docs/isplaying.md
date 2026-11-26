---
layout: doc
title: $isPlaying[]
translation_key: docs
category: "Music"
function_name: isPlaying
syntax: $isPlaying
description: "Whether a track is playing (not paused)."
---
# $isPlaying — Whether a track is playing (not paused).

## Syntax

```
$isPlaying
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$isPlaying → result
```

## Example

```bdfd
$sendMessage[$isPlaying]
```
