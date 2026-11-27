---
layout: doc
title: $isQueueHistoryDisabled[]
translation_key: docs
category: "Music"
function_name: isQueueHistoryDisabled
syntax: $isQueueHistoryDisabled
description: "Always false: the history is kept."
---
# $isQueueHistoryDisabled — Always false: the history is kept.

## Syntax

```
$isQueueHistoryDisabled
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$isQueueHistoryDisabled → result
```

## Example

```bdfd
$sendMessage[$isQueueHistoryDisabled]
```
