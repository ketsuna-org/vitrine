---
layout: doc
title: $isQueueHistoryEmpty[]
translation_key: docs
category: "Music"
function_name: isQueueHistoryEmpty
syntax: $isQueueHistoryEmpty
description: "Whether no track was played yet."
---
# $isQueueHistoryEmpty — Whether no track was played yet.

## Syntax

```
$isQueueHistoryEmpty
```

## Parameters

None.

## Return Value

- Boolean.

## Usage

```
$isQueueHistoryEmpty → result
```

## Example

```bdfd
$sendMessage[$isQueueHistoryEmpty]
```
