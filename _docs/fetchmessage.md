---
layout: doc
title: $fetchMessage[]
translation_key: docs
category: "Responses"
function_name: fetchMessage
syntax: $fetchMessage[(channelID);messageID]
description: "Checks that a message can be read. Every function reads Discord by itself, so it changes nothing."
---
# $fetchMessage — Checks that a message can be read. Every function reads Discord by itself, so it changes nothing.

## Syntax

```
$fetchMessage[(channelID);messageID]
```

## Parameters

- **channelID** *(String, optional)* — Channel ID (empty: the current channel)
- **messageID** *(String, required)* — Message ID

## Return Value

- None.

## Usage

```
$fetchMessage[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$fetchMessage[channelID;messageID]]
```
