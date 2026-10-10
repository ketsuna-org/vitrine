---
layout: doc
title: $serverChannelExists
translation_key: docs
category: "Entity Info"
function_name: serverChannelExists
syntax: $serverChannelExists[nameOrID]
description: Checks if a channel (or active thread) with a given name or ID exists on the current server. Returns true/false.
---
# $serverChannelExists

The function `$serverChannelExists[]` checks if a **channel exists on the current server**, by its ID or by its name.

## Syntax

```
$serverChannelExists[nameOrID]
```

## Parameters

| Parameter | Description |
|---|---|
| `nameOrID` | Required. If the value is a positive number, it is matched against channel IDs; otherwise it is matched against channel names (exact, case-sensitive, no wildcards). Active threads are included. An empty value returns `"false"`. |

## Return Value

- **Type**: Boolean (string)
- `"true"` if the channel exists.
- `"false"` otherwise.

## Examples

### Simple Check

```bdfd
$if[$serverChannelExists[logs]==true]
  $sendMessage[The #logs channel already exists.]
$else
  $sendMessage[The #logs channel does not exist.]
$endif
```

### Check by ID

```bdfd
$if[$serverChannelExists[$channelID]==true]
  $sendMessage[This channel exists.]
$endif
```

## Notes

- Different from `$channelExists[]`, which only checks an ID.
- A name made only of digits is treated as an ID.
- Useful to avoid duplicate channels before creating one.
