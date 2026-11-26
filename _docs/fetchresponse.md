---
layout: doc
title: $fetchResponse[]
translation_key: docs
category: "Responses"
function_name: fetchResponse
syntax: $fetchResponse[(channelID);messageID]
description: "Copies the embeds and the buttons and select menus of a message to the response."
---
# $fetchResponse — Copies the embeds and the buttons and select menus of a message to the response.

## Syntax

```
$fetchResponse[(channelID);messageID]
```

## Parameters

- **channelID** *(String, optional)* — Channel ID (empty: the current channel)
- **messageID** *(String, required)* — Message ID

## Return Value

- None.

## Usage

```
$fetchResponse[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$fetchResponse[channelID;messageID]]
```
