---
layout: doc
title: $automodActionType[]
translation_key: docs
category: "Events"
function_name: automodActionType
syntax: $automodActionType
description: "Type of the action taken (BlockMessage, SendAlertMessage, Timeout, BlockMemberInteraction). (AutoMod events)."
---
# $automodActionType — Type of the action taken (BlockMessage, SendAlertMessage, Timeout, BlockMemberInteraction). (AutoMod events).

## Syntax

```
$automodActionType
```

## Parameters

None.

## Return Value

- String.

## Usage

```
$automodActionType → result
```

## Example

```bdfd
$sendMessage[$automodActionType]
```
