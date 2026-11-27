---
layout: doc
title: $enableComponentsOf[]
translation_key: docs
category: "Moderation"
function_name: enableComponentsOf
syntax: $enableComponentsOf[channelID;messageID]
description: "Enables all components of a message, returns bool"
---
# $enableComponentsOf — Enables all components of a message, returns bool

## Syntax

```
$enableComponentsOf[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel id to pull message from
- **messageID** *(id, required)* — The message to enable components on

## Return Value

- Boolean.

## Usage

```
$enableComponentsOf[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$enableComponentsOf[30;1000]]
```
