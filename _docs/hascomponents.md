---
layout: doc
title: $hasComponents[]
translation_key: docs
category: "Entity Info"
function_name: hasComponents
syntax: $hasComponents[channelID;messageID]
description: "Checks whether given message has components"
---
# $hasComponents — Checks whether given message has components

## Syntax

```
$hasComponents[channelID;messageID]
```

## Parameters

- **channelID** *(id, required)* — The channel to get message from
- **messageID** *(id, required)* — The message to check for components

## Return Value

- Boolean.

## Usage

```
$hasComponents[channelID;messageID] → result
```

## Example

```bdfd
$sendMessage[$hasComponents[30;1000]]
```
