---
layout: doc
title: $fetchRows[]
translation_key: docs
category: "Responses"
function_name: fetchRows
syntax: $fetchRows[(channelID);messageID]
description: "Alias of $fetchComponents."
---
# $fetchRows — Alias of $fetchComponents.

## Syntax

```
$fetchRows[(channelID);messageID]
```

## Parameters

- **channelID** *(String, optional)* — Channel ID (empty: the current channel)
- **messageID** *(String, required)* — Message ID

## Return Value

- None.

## Usage

```
$fetchRows[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$fetchRows[channelID;messageID]]
```
