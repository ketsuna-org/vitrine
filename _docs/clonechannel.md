---
layout: doc
title: $cloneChannel[]
translation_key: docs
category: "Server Helpers"
function_name: cloneChannel
syntax: $cloneChannel[channelID;(name);(reason)]
description: "Creates a copy of a channel and returns the ID of the new one: same type, topic, age restriction, slowmode and category."
---
# $cloneChannel — Creates a copy of a channel and returns the ID of the new one: same type, topic, age restriction, slowmode and category

## Syntax

```
$cloneChannel[channelID;(name);(reason)]
```

## Parameters

- **channelID** *(ID, required)* — The channel to copy (text, voice, stage, forum or category).
- **name** *(text, optional)* — Name of the copy. Default: the same name.
- **reason** *(text, optional)* — The reason recorded in the server's audit log (up to 512 characters). Empty or absent: the reason set with `$auditLogReason`, if any.

## Return Value

- ID: the new channel.

## Usage

```
$cloneChannel[123456;ticket-copy]
```

## Important Notes

- Permission overrides are NOT copied: set them with `$editChannelPerms`.
- Announcement, media and thread channels cannot be cloned.

## Example

```bdfd
$sendMessage[$cloneChannel[123456;ticket-copy]]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
