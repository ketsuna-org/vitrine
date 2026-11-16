---
layout: doc
title: $createEvent
translation_key: docs
category: "Scheduled events"
function_name: createEvent
syntax: $createEvent[name;type;start;end;where;description;(reason)]
description: Creates a scheduled event in the server and returns its ID.
---

# $createEvent

Creates a scheduled event in the server and returns its ID. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$createEvent[name;type;start;end;where;description;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | **Required.** The event name. |
| `type` | **Required.** `voice`, `stage` or `external`. |
| `start` | **Required.** Start time, unix seconds or ISO 8601 date. |
| `end` | End time. Required for `external` events. |
| `where` | **Required.** A voice or stage channel ID, or the location text for an `external` event. |
| `description` | Optional description. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- The ID of the new event.

## Behavior

- The bot needs Manage Events.
- The start time must be in the future.

## Examples

```bdfd
$createEvent[Game night;external;1900000000;1900007200;Discord stage;Come and play]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
