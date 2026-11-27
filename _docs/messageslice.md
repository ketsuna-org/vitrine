---
layout: doc
title: $messageSlice[]
translation_key: docs
category: "Responses"
function_name: messageSlice
syntax: $messageSlice[(start);(end)]
description: "Words of the command arguments from start up to (not including) end, like JavaScript slice."
---
# $messageSlice — Words of the command arguments from start up to (not including) end, like JavaScript slice.

## Syntax

```
$messageSlice[(start);(end)]
```

## Parameters

- **start** *(Number, optional)* — Start (negative counts from the end)
- **end** *(Number, optional)* — End

## Return Value

- String.

## Usage

```
$messageSlice[start;end] → result
```

## Example

```bdfd
$sendMessage[$messageSlice[start;end]]
```
