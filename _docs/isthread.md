---
layout: doc
title: $isThread[]
translation_key: docs
category: "Entity Info"
function_name: isThread
syntax: $isThread[channelID]
description: "Returns whether the channel is a thread."
---
# $isThread — Returns whether the channel is a thread.

## Syntax

```
$isThread[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to check

## Return Value

- Boolean.

## Usage

```
$isThread[channelID] → result
```

## Example

```bdfd
$sendMessage[$isThread[35]]
```
