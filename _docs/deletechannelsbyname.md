---
layout: doc
translation_key: docs
category: "Channel"
---

# $deleteChannelsByName

Deletes channels that match a given name. Supports wildcards (`*`) to target multiple channels at once.

## Syntax

```bdfd
$deleteChannelsByName[channelName]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `channelName` | Name of the channel(s) to delete. Supports the wildcard `*` | Yes |

## Description

`$deleteChannelsByName` deletes one or multiple channels based on their **name**. Unlike `$deleteChannels` which requires channel IDs, this function allows deletion by name and supports the `*` wildcard to target channels with similar names.

The bot must have the `MANAGE_CHANNELS` permission to use this function. Deletion is **irreversible** — deleted channels cannot be recovered.

## Examples

### Delete a specific channel

```bdfd
$deleteChannelsByName[general-chat]
$sendMessage[Channel deleted.]
```

### Delete with wildcard

```bdfd
$deleteChannelsByName[spam-*]
$sendMessage[All spam channels deleted.]
```

### Ticket cleanup

```bdfd
$deleteChannelsByName[ticket-*]
$sendMessage[All ticket channels deleted.]
```

### Conditional deletion

```bdfd
$if[$checkUserPerms[$authorID;Administrator]==true]
  $deleteChannelsByName[temp-*]
  $sendMessage[Temporary channels deleted.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- **Irreversible action**: deleted channels cannot be restored.
- The wildcard `*` matches any sequence of characters (e.g., `ticket-*` matches `ticket-123`, `ticket-abc`, etc.).
- The bot must have the `Manage Channels` permission.
- For categories, deletion also removes all child channels.
- Use `$deleteChannels` to delete by channel ID instead of name.
