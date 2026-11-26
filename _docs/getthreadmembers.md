---
layout: doc
title: $getThreadMembers[]
translation_key: docs
category: "Entity Info"
function_name: getThreadMembers
syntax: $getThreadMembers[channelID;(separator)]
description: "Returns all members from a thread."
---
# $getThreadMembers — Returns all members from a thread.

## Syntax

```
$getThreadMembers[channelID;(separator)]
```

## Parameters

- **channelID** *(id, required)* — The thread to pull members from
- **separator** *(text, optional)* — The separator for every id

## Return Value

- Member[].

## Usage

```
$getThreadMembers[channelID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$getThreadMembers[35;,]]
```
