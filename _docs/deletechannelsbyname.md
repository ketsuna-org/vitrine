---
layout: doc
translation_key: docs
category: "Channel"
---

# $deleteChannelsByName

Deletes the channels of the current server whose name is exactly one of the given names.

## Syntax

```text
$deleteChannelsByName[channelName;(channelName2);(...)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `channelName` | Name of the channel(s) to delete. Trimmed; an empty name raises `Channel name is required.` | Yes |
| `channelName2`, ... | More names (up to 10000 arguments in total). | No |

## Description

`$deleteChannelsByName` lists the channels of the current server and deletes **every channel whose name is exactly equal** to one of the given names. Unlike `$deleteChannels`, which takes channel IDs, it works from names.

- The comparison is an exact match (case-sensitive). **There is no wildcard**: `spam-*` only matches a channel literally named `spam-*`.
- All matching channels are deleted, whatever their type (text, voice, category, ...) and even when several share the same name. Active threads are not part of the list searched.
- If no channel matches, the function fails with `No matching channels found.`
- The bot's Manage Channels permission is checked for the channel being deleted. Deletion is **irreversible**.
- It needs a server: `Channel lookup requires a guild.` otherwise.
- Deleting a category with this function deletes only the category channel itself (the engine sends one deletion per matched channel; it never deletes children).

## Examples

### Delete a specific channel

```bdfd
$deleteChannelsByName[general-chat]
Channel deleted.
```

### Delete several names at once

```bdfd
$deleteChannelsByName[temp-1;temp-2;temp-3]
Temporary channels deleted.
```

### Handle the case where nothing matches

```bdfd
$suppressErrors[No channel with that name.]
$deleteChannelsByName[ticket-archive]
Channel deleted.
```

## Notes

- **Irreversible action**: deleted channels cannot be restored.
- Use `$deleteChannels` to delete by channel ID instead of name.
