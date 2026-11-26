---
layout: doc
title: $getEmbeds[]
translation_key: docs
category: "Entity Info"
function_name: getEmbeds
syntax: $getEmbeds[channelID;messageID;(embedindex);(property);(fieldindex)]
description: "Retrieves data of an embed, not providing any property returns embed json"
---
# $getEmbeds — Retrieves data of an embed, not providing any property returns embed json

## Syntax

```
$getEmbeds[channelID;messageID;(embedindex);(property);(fieldindex)]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to retrieve data from
- **embedindex** *(number, optional)* — The embed index to get data from
- **property** *(text, optional)* — The property to pull
- **fieldindex** *(number, optional)* — The index of field to get

## Return Value

- Unknown.

## Usage

```
$getEmbeds[channelID;messageID;(embedindex);(property);(fieldindex)] → result
```

## Example

```bdfd
$sendMessage[$getEmbeds[30;1000;0;title]]
```
