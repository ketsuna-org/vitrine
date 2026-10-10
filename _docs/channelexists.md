---
layout: doc
title: $channelExists
translation_key: docs
category: "Entity Info"
function_name: channelExists
syntax: $channelExists[channelID]
description: Checks if a Discord channel with the given ID exists. Returns "true" or "false".
---

# $channelExists

The `$channelExists` function checks if a **Discord channel exists** by its ID. Useful for ensuring a target channel is always valid before interacting with it.

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
| `string` | `"true"` if Discord returns the channel, `"false"` otherwise. |

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
- The check is not limited to the current server: any channel that Discord returns for the ID to the bot counts, including threads and DM channels.
- An ID that is not a positive number returns `false` (no error). An unknown channel (Discord error 10003) returns `false`; other Discord errors (for example missing access) are raised as errors.
- Useful in log or configuration systems where IDs are stored.
