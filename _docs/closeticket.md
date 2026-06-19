---
layout: doc
title: $closeTicket
translation_key: docs
category: "Moderation"
function_name: closeTicket
syntax: $closeTicket[(errorMessage)]
description: Closes and deletes the current ticket channel. If the channel is not a ticket, an optional error message can be displayed.
---

# $closeTicket

The `$closeTicket[]` function **closes and deletes a ticket** (the current channel). It is equivalent to `$deleteChannels[$channelID]` with check validation.

## Syntax

```
$closeTicket[(errorMessage)]
```

## Parameters

| Parameter | Description |
|---|---|
| `errorMessage` | Optional - Message sent if the command is not executed in a ticket channel. Default: "This channel is not a ticket." |

## Return value

This function does not return a value.

## Behavior

- Deletes the channel in which the command is executed.
- Designed for use in channels created by `$newTicket[]`.
- If the channel is not a recognized ticket, displays the error message.
- The bot must have `MANAGE_CHANNELS` permission.

## Examples

### Simple closure

```bdfd
$closeTicket
```

### Closure with confirmation

```bdfd
$sendMessage[Closing the ticket in 5 seconds...]
$wait[5]
$closeTicket
```

### Closure with logs

```bdfd
$let[logChannel;123456789]
$channelSendMessage[$logChannel;Ticket closed by $username.]
$closeTicket
```

### Conditional closure

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $closeTicket
$else
  $closeTicket[Only administrators and moderators can close this ticket.]
$endif
```

### Closure with backup

```bdfd
$let[transcript;$getChannelMessages[$channelID;100]]
$setUserVar[lastTicketTranscript;$transcript]
$channelSendMessage[$logChannel;Transcript saved. Ticket closed by $username.]
$closeTicket
```

## Notes

- `$closeTicket[]` deletes the channel — this action is irreversible.
- Save important information before closing (transcripts, logs).
- Custom error messages help prevent accidental closures.
- For a closure without deletion, archive the channel using `$modifyChannel[]` instead.
