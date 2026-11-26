---
layout: doc
title: $hasMusicNode[]
translation_key: docs
category: "Music"
function_name: hasMusicNode
syntax: $hasMusicNode
description: "Whether the server has a track playing or queued."
---
# $hasMusicNode — Whether the server has a track playing or queued.

## Syntax

```
$hasMusicNode
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$hasMusicNode → result
```

## Example

```bdfd
$sendMessage[$hasMusicNode]
```
