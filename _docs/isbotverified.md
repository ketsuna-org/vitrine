---
layout: doc
title: $isBotVerified[]
translation_key: docs
category: "Entity Info"
function_name: isBotVerified
syntax: $isBotVerified[userID]
description: "Returns whether the bot is verified."
---
# $isBotVerified — Returns whether the bot is verified.

## Syntax

```
$isBotVerified[userID]
```

## Parameters

- **userID** *(id, required)* — The bot to check whether its verified

## Return Value

- Boolean.

## Usage

```
$isBotVerified[userID] → result
```

## Example

```bdfd
$sendMessage[$isBotVerified[98]]
```
