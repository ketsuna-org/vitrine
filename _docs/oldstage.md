---
layout: doc
title: $oldStage[]
translation_key: docs
category: "Events"
function_name: oldStage
syntax: $oldStage[property;(separator)]
description: "Stage instance before a stageInstanceUpdate event. Properties: channelID, id, topic, timestamp, guildID, privacyLevel, eventId."
---
# $oldStage — Stage instance before a stageInstanceUpdate event. Properties: channelID, id, topic, timestamp, guildID, privacyLevel, eventId.

## Syntax

```
$oldStage[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$oldStage[property] → value
```

## Example

```bdfd
$sendMessage[$oldStage[property]]
```
