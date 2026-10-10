---
layout: doc
title: $channelIDFromName
translation_key: docs
category: "Entity Info"
function_name: channelIDFromName
syntax: $channelIDFromName[name]
description: Returns the ID of a Discord channel from its name.
---

# $channelIDFromName

The `$channelIDFromName` function returns the **ID** of a Discord channel of the current server from its **name**. The name must match exactly (the comparison is case-sensitive).

## Syntax

```
$channelIDFromName[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The exact name of the channel to search for, case-sensitive (`general` does not match `General`). Surrounding spaces are removed. An empty name raises `Channel name is required.` |

## Return value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the channel found, or `""` if no channel matches. |

## Examples

### Get the ID

```bdfd
$sendMessage[ID of general: $channelIDFromName[general]]
```

### Send to a channel by name

```bdfd
$channelSendMessage[$channelIDFromName[announcements];New update available!]
```

### Check existence

```bdfd
$if[$channelIDFromName[logs]!=]
  $sendMessage[Channel #logs found! ID : $channelIDFromName[logs]]
$else
  $sendMessage[No #logs channel found.]
$endif
```

### Troubleshooting similar names

```bdfd
$if[$channelIDFromName[general]!=]
  $sendMessage[Channel general found.]
$else
  $sendMessage[Error: channel not found. Try another name.]
$endif
```

## Notes

- If multiple channels share the same name, only the first one found is returned.
- Categories, voice channels and active threads are searched too, not only text channels.
- Use `$findChannel` for a more flexible search (case-insensitive, partial names, mentions or IDs).
- The name must not include the `#` prefix.
