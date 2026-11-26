---
layout: doc
title: $getMessageClientTheme[]
translation_key: docs
category: "Responses"
function_name: getMessageClientTheme
syntax: $getMessageClientTheme[(channelID);messageID;property;(separator)]
description: "Reads the shared client theme of a message: baseMix, baseTheme, gradientAngle or colors."
---
# $getMessageClientTheme — Reads the shared client theme of a message: baseMix, baseTheme, gradientAngle or colors.

## Syntax

```
$getMessageClientTheme[(channelID);messageID;property;(separator)]
```

## Parameters

- **channelID** *(String, optional)* — Channel ID
- **messageID** *(String, required)* — Message ID
- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Separator for colors

## Return Value

- String.

## Usage

```
$getMessageClientTheme[channelID;messageID;property;separator] → result
```

## Example

```bdfd
$sendMessage[$getMessageClientTheme[channelID;messageID;property;separator]]
```
