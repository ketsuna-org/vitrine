---
layout: doc
title: $deleteSound
translation_key: docs
category: "Soundboard"
function_name: deleteSound
syntax: $deleteSound[soundID;(reason)]
description: Deletes a soundboard sound of the server.
---

# $deleteSound

Deletes a soundboard sound of the server. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching action.

## Syntax

```
$deleteSound[soundID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `soundID` | **Required.** The sound ID. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- Returns nothing.

## Behavior

- The bot needs Manage Guild Expressions.

## Examples

```bdfd
$deleteSound[$message[1]]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
