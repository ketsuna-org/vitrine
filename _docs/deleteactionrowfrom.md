---
layout: doc
title: $deleteActionRowFrom[]
translation_key: docs
category: "Moderation"
function_name: deleteActionRowFrom
syntax: $deleteActionRowFrom[channelID;messageID;index]
description: "Deletes an action row or top level component at given index"
---
# $deleteActionRowFrom — Deletes an action row or top level component at given index

## Syntax

```
$deleteActionRowFrom[channelID;messageID;index]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to remove row from
- **index** *(number, required)* — The row index to delete

## Return Value

- Boolean.

## Usage

```
$deleteActionRowFrom[channelID;messageID;index] → result
```

## Example

```bdfd
$sendMessage[$deleteActionRowFrom[30;1000;1]]
```
