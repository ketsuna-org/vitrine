---
layout: doc
title: $editEvent
translation_key: docs
category: "Scheduled events"
function_name: editEvent
syntax: $editEvent[eventID;setting;value]
description: Edits one setting of a scheduled event.
---

# $editEvent

Edits one setting of a scheduled event. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$editEvent[eventID;setting;value]
```

## Parameters

| Parameter | Description |
|---|---|
| `eventID` | **Required.** The event ID (see `$listEvents`). |
| `setting` | **Required.** `name`, `description`, `start`, `end` or `status` (`active`, `completed`, `canceled`). |
| `value` | **Required.** The new value. |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Manage Events.

## Examples

```bdfd
$editEvent[$message[1];name;New name]
```
