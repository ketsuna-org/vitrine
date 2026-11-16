---
layout: doc
title: $editEvent
translation_key: docs
category: "Scheduled events"
function_name: editEvent
syntax: $editEvent[eventID;setting;value;(reason)]
description: Edits one setting of a scheduled event.
---

# $editEvent

Edits one setting of a scheduled event. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$editEvent[eventID;setting;value;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `eventID` | **Required.** The event ID (see `$listEvents`). |
| `setting` | **Required.** `name`, `description`, `start`, `end` or `status` (`active`, `completed`, `canceled`). |
| `value` | **Required.** The new value. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Manage Events.

## Examples

```bdfd
$editEvent[$message[1];name;New name]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
