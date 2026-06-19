---
layout: doc
title: $deleteChannels
translation_key: docs
category: "Moderation"
function_name: deleteChannels
syntax: $deleteChannels[channelID1;channelID2;...]
description: "Deletes one or multiple channels by their ID. Alias: $deleteChannelsByName for deletion by name."
---

# $deleteChannels

The `$deleteChannels[]` function **deletes one or multiple channels** by their ID. An alias `$deleteChannelsByName[]` exists for deleting channels by name.

## Syntax

```
$deleteChannels[channelID1;channelID2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID1;channelID2;...` | Channel IDs to delete, separated by `;`. |

## Return value

This function does not return a value.

## Behavior

- The bot must have the `MANAGE_CHANNELS` permission.
- Deletion is **irreversible**.
- If an ID is invalid, the other valid channels are still deleted.

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

### Deletion by name (alias)

```bdfd
$deleteChannelsByName[ticket-*]
$sendMessage[All ticket channels deleted.]
```

## Notes

- **Irreversible action**: use with caution.
- Deleted channels cannot be restored via the API.
- For categories, deletion also deletes all child channels.
- The alias `$deleteChannelsByName[]` accepts wildcards (`*`).
