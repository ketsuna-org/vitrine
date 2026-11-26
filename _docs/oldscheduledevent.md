---
layout: doc
title: $oldScheduledEvent[]
translation_key: docs
category: "Events"
function_name: oldScheduledEvent
syntax: $oldScheduledEvent[property;(separator)]
description: "Scheduled event before a guildScheduledEventUpdate event. Properties: id, userID, guildID, channelID, name, userCount, description, startTimestamp, endTimestamp, timestamp, url, entityID, location, entityType, privacyLevel, status."
---
# $oldScheduledEvent — Scheduled event before a guildScheduledEventUpdate event. Properties: id, userID, guildID, channelID, name, userCount, description, startTimestamp, endTimestamp, timestamp, url, entityID, location, entityType, privacyLevel, status.

## Syntax

```
$oldScheduledEvent[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property
- **separator** *(String, optional)* — Ignored

## Return Value

- String.

## Usage

```
$oldScheduledEvent[property] → value
```

## Example

```bdfd
$sendMessage[$oldScheduledEvent[property]]
```
