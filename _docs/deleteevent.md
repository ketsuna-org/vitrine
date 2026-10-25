---
layout: doc
title: $deleteEvent
translation_key: docs
category: "Scheduled events"
function_name: deleteEvent
syntax: $deleteEvent[eventID]
description: Deletes a scheduled event.
---

# $deleteEvent

Deletes a scheduled event. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$deleteEvent[eventID]
```

## Parameters

| Parameter | Description |
|---|---|
| `eventID` | **Required.** The event ID. |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Manage Events.

## Examples

```bdfd
$deleteEvent[$message[1]]
```
