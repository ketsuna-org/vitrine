---
layout: doc
title: $enableButtonsOf[]
translation_key: docs
category: "Moderation"
function_name: enableButtonsOf
syntax: $enableButtonsOf[channelID;messageID;(index)]
description: "Enables all buttons of a message, returns bool"
---
# $enableButtonsOf — Enables all buttons of a message, returns bool

## Syntax

```
$enableButtonsOf[channelID;messageID;(index)]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to enable buttons on
- **index** *(number, optional)* — The index of the row to enable

## Return Value

- Boolean.

## Usage

```
$enableButtonsOf[channelID;messageID;(index)] → result
```

## Example

```bdfd
$sendMessage[$enableButtonsOf[30;1000;0]]
```
