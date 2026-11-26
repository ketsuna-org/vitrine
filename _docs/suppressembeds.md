---
layout: doc
title: $suppressEmbeds[]
translation_key: docs
category: "Moderation"
function_name: suppressEmbeds
syntax: $suppressEmbeds[channelID;messageID]
description: "Suppresses embeds on a message, returns bool"
---
# $suppressEmbeds — Suppresses embeds on a message, returns bool

## Syntax

```
$suppressEmbeds[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to suppress embeds on

## Return Value

- Boolean.

## Usage

```
$suppressEmbeds[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$suppressEmbeds[30;1000]]
```
