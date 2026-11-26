---
layout: doc
title: $currentTrackTotalDuration[]
translation_key: docs
category: "Music"
function_name: currentTrackTotalDuration
syntax: $currentTrackTotalDuration
description: "Total duration of the current track, in milliseconds."
---
# $currentTrackTotalDuration — Total duration of the current track, in milliseconds.

## Syntax

```
$currentTrackTotalDuration
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$currentTrackTotalDuration → result
```

## Example

```bdfd
$sendMessage[$currentTrackTotalDuration]
```
