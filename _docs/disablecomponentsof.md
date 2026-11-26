---
layout: doc
title: $disableComponentsOf[]
translation_key: docs
category: "Moderation"
function_name: disableComponentsOf
syntax: $disableComponentsOf[channelID;messageID]
description: "Disables all components of a message, returns bool"
---
# $disableComponentsOf — Disables all components of a message, returns bool

## Syntax

```
$disableComponentsOf[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to disable components on

## Return Value

- Boolean.

## Usage

```
$disableComponentsOf[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$disableComponentsOf[30;1000]]
```
