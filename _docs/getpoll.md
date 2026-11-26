---
layout: doc
title: $getPoll[]
translation_key: docs
category: "Entity Info"
function_name: getPoll
syntax: $getPoll[channelID;messageID;property]
description: "Retrieves data of a poll from a message"
---
# $getPoll — Retrieves data of a poll from a message

## Syntax

```
$getPoll[channelID;messageID;property]
```

## Parameters

- **channelID** *(id, required)* — The channel to pull message from
- **messageID** *(id, required)* — The message to retrieve data from
- **property** *(text, required)* — The property to pull

## Return Value

- Unknown.

## Usage

```
$getPoll[channelID;messageID;property] → result
```

## Example

```bdfd
$sendMessage[$getPoll[30;1000;question]]
```
