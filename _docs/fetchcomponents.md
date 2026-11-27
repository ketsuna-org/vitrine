---
layout: doc
title: $fetchComponents[]
translation_key: docs
category: "Responses"
function_name: fetchComponents
syntax: $fetchComponents[(channelID);messageID]
description: "Copies the buttons and string select menus of a message to the response."
---
# $fetchComponents — Copies the buttons and string select menus of a message to the response.

## Syntax

```
$fetchComponents[(channelID);messageID]
```

## Parameters

- **channelID** *(String, optional)* — Channel ID (empty: the current channel)
- **messageID** *(String, required)* — Message ID

## Return Value

- None.

## Usage

```
$fetchComponents[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$fetchComponents[channelID;messageID]]
```
