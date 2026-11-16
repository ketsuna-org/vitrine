---
layout: doc
title: $showChannel[]
translation_key: docs
category: "Server Helpers"
function_name: showChannel
syntax: $showChannel[(channelID);(roleOrUserID);(reason)]
description: "Removes that denial for a role, a member or `@everyone`."
---
# $showChannel — Removes that denial for a role, a member or `@everyone`

## Syntax

```
$showChannel[(channelID);(roleOrUserID);(reason)]
```

## Parameters

- **channelID** *(ID, optional)* — Default: the current channel.
- **roleOrUserID** *(ID, optional)* — Default: `@everyone`.
- **reason** *(text, optional)* — The reason recorded in the server's audit log (up to 512 characters). Empty or absent: the reason set with `$auditLogReason`, if any.

## Return Value

- empty.

## Usage

```
$showChannel[]
$showChannel[123456;789]
```

## Important Notes

- The bot needs Manage Roles on the channel.
- Only this one override is changed; the other overrides of the channel are kept.

## Example

```bdfd
$showChannel[]
$sendMessage[Channel shown.]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
