---
layout: doc
title: $fetchEmbeds[]
translation_key: docs
category: "Responses"
function_name: fetchEmbeds
syntax: $fetchEmbeds[(channelID);messageID;(index)]
description: "Copies the embeds of a message (or one of them) to the response."
---
# $fetchEmbeds — Copies the embeds of a message (or one of them) to the response.

## Syntax

```
$fetchEmbeds[(channelID);messageID;(index)]
```

## Parameters

- **channelID** *(String, optional)* — Channel ID (empty: the current channel)
- **messageID** *(String, required)* — Message ID
- **index** *(Number, optional)* — Embed index (empty: all)

## Return Value

- None.

## Usage

```
$fetchEmbeds[channelID;messageID;index] → result
```

## Example

```bdfd
$sendMessage[$fetchEmbeds[channelID;messageID;index]]
```
