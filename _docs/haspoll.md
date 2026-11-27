---
layout: doc
title: $hasPoll[]
translation_key: docs
category: "Entity Info"
function_name: hasPoll
syntax: $hasPoll[channelID;messageID]
description: "Checks whether given message holds a poll"
---
# $hasPoll — Checks whether given message holds a poll

## Syntax

```
$hasPoll[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get message from
- **messageID** *(id, required)* — The message to check for a poll

## Return Value

- Boolean.

## Usage

```
$hasPoll[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$hasPoll[30;1000]]
```
