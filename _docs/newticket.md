---
layout: doc
title: $newTicket
category: "Moderation"
function_name: newTicket
api_type: bdfd
syntax: $newTicket[categoryIDorName;noSubjectMessage;inTicketMessage;messageToUser;errorMessage;(ticketNumber);(returnMessageID)]
description: Creates a private ticket channel for the command author, sends an optional message in it, and answers the user.
---

# $newTicket

The function `$newTicket[]` creates a **private text channel** named `ticket-...` for the author of the command, optionally inside a category, then sends a welcome message in the new channel and a confirmation to the user.

## Syntax

```
$newTicket[categoryIDorName;noSubjectMessage;inTicketMessage;messageToUser;errorMessage;(ticketNumber);(returnMessageID)]
```

At least the first 5 arguments are required (they may be empty); a call with fewer than 5 or more than 7 arguments is refused.

## Parameters

| Parameter | Description |
|---|---|
| `categoryIDorName` | Required (may be empty). ID of the category, or name of a category (case-insensitive). Empty creates the channel without a category. An unknown category name is a failure (see `errorMessage`). |
| `noSubjectMessage` | Required (may be empty). Text used as the ticket subject when the command was called without any text. |
| `inTicketMessage` | Required (may be empty). Message sent inside the new ticket channel. Empty means no message is sent in the channel. |
| `messageToUser` | Required (may be empty). Text added to the response of the command (the confirmation shown to the user). |
| `errorMessage` | Required (may be empty). Text added to the response if the ticket could not be created. If it is empty, a failure raises an error instead. |
| `ticketNumber` | Optional. Integer used as the channel name suffix. Empty means no number; any other non-integer value raises `Ticket number must be an integer.` |
| `returnMessageID` | Optional. `yes`/`true` to return the ID of the message sent in the ticket channel, `no`/`false` (default when the argument is absent) to return nothing. Any other value, including an empty one, raises `Return message ID must be yes or no.` |

In `inTicketMessage` and in `messageToUser`, `{subject}` is replaced by the ticket subject and `{channel}` by the mention of the new channel (`<#id>`).

## Behavior

- The channel is named `ticket-<suffix>`, where the suffix is `ticketNumber` if given, otherwise the author's username (lowercase; each run of characters other than letters, digits, `-` and `_` is replaced by one `-`, and leading/trailing `-` are removed), otherwise the author's ID.
- The subject is the content of the command message (`message.content`); if it is empty, `noSubjectMessage` is used.
- The bot needs `Manage Channels` (the channel is created like `$createChannel`); a refusal is a creation failure (see `errorMessage`).
- Permissions of the channel: `@everyone` cannot view it; the author and the bot can view it, send messages and read the history.
- If `inTicketMessage` is not empty, it is sent in the new channel (the pending response is flushed first).
- `messageToUser` is appended to the response of the command.
- Returns the ID of the message sent in the ticket channel only when `returnMessageID` is `yes`/`true` and `inTicketMessage` was not empty; otherwise it returns an empty string.
- The function raises an error if the ticket service or the message output is unavailable.

See also [Support Ticket System Guide](/docs/tickets/), [$closeTicket](/docs/closeticket/), [$isTicket](/docs/isticket/) and [Execution model](/docs/execution-model/).

## Examples

### Create a ticket in a category

```bdfd
$newTicket[Support;No subject given;Hello <@$authorID>, a staff member will help you about: {subject};Your ticket is ready: {channel};Could not create the ticket.]
```

### Without category, with a ticket number

```bdfd
$newTicket[;General request;Welcome to your ticket!;Ticket created: {channel};Ticket creation failed.;42]
```
