---
layout: doc
title: $deleteChannels
translation_key: docs
category: "Moderation"
function_name: deleteChannels
syntax: $deleteChannels[channelID1;channelID2;...]
description: "Deletes one or multiple channels by their ID (at least one ID required). $deleteChannelsByName is a separate function that deletes by exact name."
---

# $deleteChannels

The `$deleteChannels[]` function **deletes one or multiple channels** by their ID. A separate function `$deleteChannelsByName[]` deletes channels by name.

## Syntax

```
$deleteChannels[channelID1;channelID2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID1` | Required. Channel ID to delete (must be a positive integer). |
| `channelID2;...` | Optional. Additional channel IDs; duplicates are deleted once. |

## Return value

An empty string.

## Behavior

- The bot must have the `MANAGE_CHANNELS` permission.
- Deletion is **irreversible**.
- All IDs are validated first: if any ID is not a positive integer, the function raises "Invalid channel ID." and nothing is deleted.

## Examples

### Simple deletion

```bdfd
$deleteChannels[$channelID]
$sendMessage[Channel deleted.]
```

### Ticket cleanup

```bdfd
$deleteChannels[$ticketID]
$sendMessage[Ticket closed and channel deleted.]
```

### Conditional deletion

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $deleteChannels[$mentionedChannels[1]]
  $sendMessage[Channels deleted.]
$else
  $sendMessage[Permission denied.]
$endif
```

### Deletion by name (separate function)

```bdfd
$deleteChannelsByName[ticket-1;ticket-2]
$sendMessage[Channels deleted.]
```

## Notes

- **Irreversible action**: use with caution.
- Deleted channels cannot be restored via the API.
- For categories, deletion also deletes all child channels.
- `$deleteChannelsByName[name1;name2;...]` matches channel names exactly (no wildcards) and raises "No matching channels found." if none match.
