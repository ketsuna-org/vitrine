---
layout: doc
title: $threadOwnerID[]
translation_key: docs
category: "Entity Info"
function_name: threadOwnerID
syntax: $threadOwnerID[channelID]
description: "Returns the owner of the thread."
---
# $threadOwnerID — Returns the owner of the thread.

## Syntax

```
$threadOwnerID[channelID]
```

## Parameters

- **channelID** *(id, required)* — The thread to retrieve owner of

## Return Value

- Member.

## Usage

```
$threadOwnerID[channelID] → result
```

## Example

```bdfd
$sendMessage[$threadOwnerID[35]]
```
