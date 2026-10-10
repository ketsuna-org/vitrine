---
layout: doc
title: $closeTicket — incomplete compatibility
category: "Moderation"
function_name: closeTicket
api_type: bdfd
status: incomplete
syntax: $closeTicket[(errorMessage)]
description: Deletes the current channel if its name contains "ticket"; otherwise returns the error message and deletes nothing.
---

# $closeTicket

`$closeTicket` **deletes the current channel** when its name contains the text `ticket` (case-insensitive, anywhere in the name, for example a channel created by `$newTicket`). The engine does not keep a persistent ticket marker: the name is the only test.

## Syntax

```
$closeTicket[(errorMessage)]
```

The argument is optional (`$closeTicket` and `$closeTicket[]` are both accepted).

## Behavior

- The channel name is read from the current channel (`channel.name`, or looked up by ID when it is not known).
- If the name does **not** contain `ticket` (or cannot be read), nothing is deleted and the function returns `errorMessage` (an empty string when it is omitted). That text becomes part of the script output at the place of the call.
- If the name contains `ticket`, the current channel is deleted, like `$deleteChannels[$channelID]`: the bot needs `Manage Channels` in that channel, otherwise an error is raised. The function returns an empty string.
- It is **not** an authorization check: it does not look at who runs the command. Check permissions yourself (for example with `$onlyPerms`) before calling it.
- Any channel whose name contains `ticket` is deleted, not only channels created by `$newTicket`.
- The channel no longer exists after the call: send any log message to another channel (`$channelSendMessage`) and do not rely on a reply in the deleted channel.

## Examples

### Close a ticket (staff only)

```bdfd
$onlyPerms[ManageChannels;Only staff can close tickets.]
$channelSendMessage[123456789012345678;Ticket $channelName[$channelID] closed by <@$authorID>.]
$closeTicket[This channel is not a ticket.]
```

### Not a ticket

```bdfd
$closeTicket[This channel is not a ticket.]
```
