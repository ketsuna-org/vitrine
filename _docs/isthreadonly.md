---
layout: doc
title: $isThreadOnly[]
translation_key: docs
category: "Entity Info"
function_name: isThreadOnly
syntax: $isThreadOnly[channelID]
description: "Returns whether the channel is a thread-only channel."
---
# $isThreadOnly — Returns whether the channel is a thread-only channel.

## Syntax

```
$isThreadOnly[channelID]
```

## Parameters

- **channelID** *(id, required)* — The channel to check

## Return Value

- Boolean.

## Usage

```
$isThreadOnly[channelID] → result
```

## Example

```bdfd
$sendMessage[$isThreadOnly[36]]
```
