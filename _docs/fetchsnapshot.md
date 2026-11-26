---
layout: doc
title: $fetchSnapshot[]
translation_key: docs
category: "Responses"
function_name: fetchSnapshot
syntax: $fetchSnapshot[(channelID);messageID;(index)]
description: "Copies the text, embeds and components of a forwarded message (snapshot) to the response."
---
# $fetchSnapshot — Copies the text, embeds and components of a forwarded message (snapshot) to the response.

## Syntax

```
$fetchSnapshot[(channelID);messageID;(index)]
```

## Parameters

- **channelID** *(String, optional)* — Channel ID (empty: the current channel)
- **messageID** *(String, required)* — Message ID
- **index** *(Number, optional)* — Snapshot index (default 0)

## Return Value

- None.

## Usage

```
$fetchSnapshot[channelID;messageID;index] → result
```

## Example

```bdfd
$sendMessage[$fetchSnapshot[channelID;messageID;index]]
```
