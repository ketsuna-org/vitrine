---
layout: doc
title: $channelExists
translation_key: docs
category: "Entity Info"
function_name: channelExists
syntax: $channelExists[channelID]
description: Checks if a Discord channel exists on the server. Returns "true" or "false".
---

# $channelExists

The `$channelExists` function checks if a **Discord channel exists** on the server by its ID. Useful for ensuring a target channel is always valid before interacting with it.

## Syntax

```
$channelExists[channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel to check. Required. |

## Return value

| Type | Description |
|---|---|
| `string` | `"true"` if the channel exists on the server, `"false"` otherwise. |

## Examples

### Simple check

```bdfd
$if[$channelExists[123456789012345678]==true]
  $sendMessage[The channel is valid.]
$else
  $sendMessage[The channel does not exist.]
$endif
```

### Check before sending a message

```bdfd
$if[$channelExists[123456789012345678]==true]
  $channelSendMessage[123456789012345678;Automated message]
$else
  $sendMessage[The log channel no longer exists!]
$endif
```

## Notes

- The returned value is a string `"true"` or `"false"`.
- Only checks channels on the current server.
- Useful in log or configuration systems where IDs are stored.
