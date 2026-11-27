---
layout: doc
title: $threadIsArchived[]
translation_key: docs
category: "Entity Info"
function_name: threadIsArchived
syntax: $threadIsArchived[channelID]
description: "Returns whether a thread is archived."
---
# $threadIsArchived — Returns whether a thread is archived.

## Syntax

```
$threadIsArchived[channelID]
```

## Parameters

- **channelID** *(id, required)* — The thread to check if its archived

## Return Value

- Boolean.

## Usage

```
$threadIsArchived[channelID] → result
```

## Example

```bdfd
$sendMessage[$threadIsArchived[35]]
```
