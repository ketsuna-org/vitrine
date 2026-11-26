---
layout: doc
title: $newStage[]
translation_key: docs
category: "Events"
function_name: newStage
syntax: $newStage[property;(separator)]
description: "State of the stage instance of a stageInstance event. Properties: channelID, id, topic, timestamp, guildID, privacyLevel, eventId."
---
# $newStage — State of the stage instance of a stageInstance event. Properties: channelID, id, topic, timestamp, guildID, privacyLevel, eventId.

## Syntax

```
$newStage[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$newStage[property] → value
```

## Example

```bdfd
$sendMessage[$newStage[property]]
```
