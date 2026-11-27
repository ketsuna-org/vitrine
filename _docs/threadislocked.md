---
layout: doc
title: $threadIsLocked[]
translation_key: docs
category: "Entity Info"
function_name: threadIsLocked
syntax: $threadIsLocked[channelID]
description: "Returns whether a thread is locked."
---
# $threadIsLocked — Returns whether a thread is locked.

## Syntax

```
$threadIsLocked[channelID]
```

## Parameters

- **channelID** *(id, required)* — The thread to check if its locked

## Return Value

- Boolean.

## Usage

```
$threadIsLocked[channelID] → result
```

## Example

```bdfd
$sendMessage[$threadIsLocked[35]]
```
