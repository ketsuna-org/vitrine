---
layout: doc
title: $isTicket
translation_key: docs
category: "Math & Text"
function_name: isTicket
syntax: $isTicket
description: Checks if the current channel is a ticket channel opened with $newTicket.
---

# $isTicket

The function `$isTicket` checks if the current channel is a ticket created via the `$newTicket[]` function in BDFD. Tickets are temporary channels used for support.

## Syntax

```
$isTicket
```

## Parameters

None.

## Return Value

- **Type**: Boolean
- `true` if the current channel is a BDFD ticket.
- `false` if it is not a ticket (normal channel, DM, etc.).

## Behavior

- Only recognizes tickets created via `$newTicket[]`.
- Useful for restricting or adapting commands to the ticket context.
- Tickets are identified by an internal BDFD marker.

## Examples

### Command restricted to tickets

```bdfd
$if[$isTicket==false]
  $sendMessage[❌ This command can only be used in a ticket.]
  $stop
$endif

;; Command logic
$sendMessage[📋 Processing the ticket...]
```

### Contextual close button

```bdfd
$if[$isTicket==true]
  $addButton[close;Close Ticket;danger]
  $sendMessage[📌 Active ticket - Use the button below to close it.]
$else
  $sendMessage[❌ You are not in a ticket channel.]
$endif
```

### Channel information

```bdfd
$title[📋 Channel Info]
$description[
**Name:** $channelName
**ID:** $channelID
**Ticket:** $if[$isTicket==true]✅ Yes$else❌ No$endif
**NSFW:** $if[$isNSFW==true]🔞 Yes$else✅ No$endif
]
$sendMessage[]
```

## Notes

- Only detects tickets created by `$newTicket[]`.
- To close a ticket, use `$closeTicket[]`.
- To create a ticket, use `$newTicket[]`.
- Only works in a server (not in DMs).
