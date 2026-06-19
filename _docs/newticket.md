---
layout: doc
title: $newTicket
translation_key: docs
category: "Moderation"
function_name: newTicket
syntax: $newTicket[categoryID;(name);(message)]
description: Creates a ticket as a new text channel in a category. The creator of the ticket automatically receives access permissions.
---

# $newTicket

The function `$newTicket` allows you to **create a ticket** as a dedicated text channel in a specific category.

## Syntax

```
$newTicket[categoryID;(name);(message)]
```

## Parameters

| Parameter | Description |
|---|---|
| `categoryID` | The ID of the category where the ticket channel should be created. |
| `name` | Optional - The name of the channel. Default: `ticket-{username}`. |
| `message` | Optional - An automatic welcome message inside the ticket. |

## Return Value

- **Type** : Snowflake (string)
- The ID of the created ticket channel.
- An empty string if it fails (due to permissions, invalid category, etc.).

## Behavior

- The bot must have the `MANAGE_CHANNELS` permission to create the channel.
- The ticket creator (the user who ran the command) automatically receives access to the channel.
- Other members cannot see the ticket by default.

## Examples

### Simple support ticket

```bdfd
$let[ticket;$newTicket[123456789;support-$username;Welcome $username! \
A staff member will assist you shortly. \
Please describe your issue in detail.]]
$if[$ticket!=]
  $sendMessage[✅ Ticket created: <#$ticket>]
$else
  $sendMessage[❌ Error during the creation of the ticket.]
$endif
```

### Ticket with staff notification

```bdfd
$let[ticket;$newTicket[123456789;ticket-$username]]
$if[$ticket!=]
  $channelSendMessage[$staffChannel;📩 New ticket by $username: <#$ticket>]
  $sendMessage[Your ticket has been created: <#$ticket>]
$endif
```

### Ticket with limit

```bdfd
$let[userTickets;$getUserVar[ticketCount]]
$if[$userTickets>=3]
  $sendMessage[❌ You already have 3 open tickets. Please close one before creating a new one.]
$else
  $let[ticket;$newTicket[123456789;ticket-$username]]
  $if[$ticket!=]
    $setUserVar[ticketCount;$sum[$userTickets;1]]
    $sendMessage[✅ Ticket #$sum[$userTickets;1] created: <#$ticket>]
  $endif
$endif
```

## Notes

- Tickets are regular text channels, not threads.
- Permissions are automatically configured for the creator.
- To close a ticket, use `$closeTicket[]`.
- Ideal for support systems, appeals, and modmails.
