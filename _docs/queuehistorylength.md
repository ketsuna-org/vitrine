---
layout: doc
title: $queueHistoryLength[]
translation_key: docs
category: "Music"
function_name: queueHistoryLength
syntax: $queueHistoryLength
description: "Number of tracks already played."
---
# $queueHistoryLength — Number of tracks already played.

## Syntax

```
$queueHistoryLength
```

## Parameters

None.

## Return Value

- Number.

## Usage

```
$queueHistoryLength → result
```

## Example

```bdfd
$sendMessage[$queueHistoryLength]
```
