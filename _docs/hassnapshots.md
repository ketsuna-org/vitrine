---
layout: doc
title: $hasSnapshots[]
translation_key: docs
category: "Entity Info"
function_name: hasSnapshots
syntax: $hasSnapshots[channelID;messageID]
description: "Checks whether given message has snapshots"
---
# $hasSnapshots — Checks whether given message has snapshots

## Syntax

```
$hasSnapshots[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get message from
- **messageID** *(id, required)* — The message to check for snapshots

## Return Value

- Boolean.

## Usage

```
$hasSnapshots[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$hasSnapshots[30;1000]]
```
