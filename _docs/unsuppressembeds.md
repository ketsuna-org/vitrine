---
layout: doc
title: $unsuppressEmbeds[]
translation_key: docs
category: "Moderation"
function_name: unsuppressEmbeds
syntax: $unsuppressEmbeds[channelID;messageID]
description: "Unsuppresses embeds on a message, returns bool"
---
# $unsuppressEmbeds — Unsuppresses embeds on a message, returns bool

## Syntax

```
$unsuppressEmbeds[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to unsuppress embeds on

## Return Value

- Boolean.

## Usage

```
$unsuppressEmbeds[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$unsuppressEmbeds[30;1000]]
```
