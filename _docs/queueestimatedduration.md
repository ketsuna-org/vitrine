---
layout: doc
title: $queueEstimatedDuration[]
translation_key: docs
category: "Music"
function_name: queueEstimatedDuration
syntax: $queueEstimatedDuration
description: "Time left to play the current track and the queue, in milliseconds."
---
# $queueEstimatedDuration — Time left to play the current track and the queue, in milliseconds.

## Syntax

```
$queueEstimatedDuration
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$queueEstimatedDuration → result
```

## Example

```bdfd
$sendMessage[$queueEstimatedDuration]
```
