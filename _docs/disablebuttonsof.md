---
layout: doc
title: $disableButtonsOf[]
translation_key: docs
category: "Moderation"
function_name: disableButtonsOf
syntax: $disableButtonsOf[channelID;messageID;(index)]
description: "Disables all buttons of a message, returns bool"
---
# $disableButtonsOf — Disables all buttons of a message, returns bool

## Syntax

```
$disableButtonsOf[channelID;messageID;(index)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to disable buttons on
- **index** *(number, optional)* — The index of the row to disable

## Return Value

- Boolean.

## Usage

```
$disableButtonsOf[channelID;messageID;(index)] → result
```

## Example

```bdfd
$sendMessage[$disableButtonsOf[30;1000]]
```
