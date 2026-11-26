---
layout: doc
title: $newScheduledEvent[]
translation_key: docs
category: "Events"
function_name: newScheduledEvent
syntax: $newScheduledEvent[property;(separator)]
description: "State of the scheduled event of a guildScheduledEvent event. Properties: id, userID, guildID, channelID, name, userCount, description, startTimestamp, endTimestamp, timestamp, url, entityID, location, entityType, privacyLevel, status."
---
# $newScheduledEvent — State of the scheduled event of a guildScheduledEvent event. Properties: id, userID, guildID, channelID, name, userCount, description, startTimestamp, endTimestamp, timestamp, url, entityID, location, entityType, privacyLevel, status.

## Syntax

```
$newScheduledEvent[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$newScheduledEvent[property] → value
```

## Example

```bdfd
$sendMessage[$newScheduledEvent[property]]
```
