---
layout: doc
title: $hasEmbeds[]
translation_key: docs
category: "Entity Info"
function_name: hasEmbeds
syntax: $hasEmbeds[channelID;messageID]
description: "Checks whether given message has embeds"
---
# $hasEmbeds — Checks whether given message has embeds

## Syntax

```
$hasEmbeds[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get message from
- **messageID** *(id, required)* — The message to check for embeds

## Return Value

- Boolean.

## Usage

```
$hasEmbeds[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$hasEmbeds[30;1000]]
```
