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

- The bot must have the `Manage Channels` permission on each channel (plus `Manage Threads` for a thread); otherwise an error is raised.
- Each ID must belong to a server channel; a channel that is not a guild channel raises an error.
- Deletion is **irreversible**.
- All IDs are validated first: if any ID is not a positive integer, the function raises "Invalid channel ID." and nothing is deleted. The channels are then deleted one after the other; if one deletion fails, the error is raised and the following channels are not deleted.

## Examples

### Simple deletion

```bdfd
$deleteChannels[$channelID]
$sendMessage[Channel deleted.]
```

### Ticket cleanup

```bdfd
$deleteChannels[123456789012345678]
$sendMessage[Ticket closed and channel deleted.]
```

### Conditional deletion

```bdfd
$if[$checkUserPerms[$authorID;Administrator]==true]
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
- `$deleteChannelsByName[name1;name2;...]` matches channel names exactly (names are trimmed, no wildcards; an empty name raises "Channel name is required.") and raises "No matching channels found." if none match.
