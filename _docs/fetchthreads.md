---
layout: doc
title: $fetchThreads[]
translation_key: docs
category: "Entity Info"
function_name: fetchThreads
syntax: $fetchThreads[channelID;(archived);(private)]
description: "Caches all threads of a channel"
---
# $fetchThreads — Caches all threads of a channel

## Syntax

```
$fetchThreads[channelID;(archived);(private)]
```

## Parameters

- **channelID** *(id, required)* — The channel to cache its threads
- **archived** *(boolean, optional)* — Whether to cache archived threads, otherwise active
- **private** *(boolean, optional)* — Whether to cache archived private threads, otherwise public

## Return Value

- String.

## Usage

```
$fetchThreads[channelID;(archived);(private)] → result
```

## Example

```bdfd
$fetchThreads[30]
$sendMessage[Done]
```
