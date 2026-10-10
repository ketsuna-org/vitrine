---
layout: doc
title: $isTicket — incomplete compatibility
category: "Moderation"
function_name: isTicket
api_type: bdfd
status: incomplete
syntax: $isTicket[(channelID)]
description: Returns true if the name of a channel (the current one by default) contains "ticket", false otherwise.
---

# $isTicket

`$isTicket` returns `true` when the name of a channel contains the text `ticket` (case-insensitive, anywhere in the name), `false` otherwise. There is no persistent ticket marker: the name is the only test.

## Syntax

```
$isTicket[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The channel to test. If omitted or empty, the current channel is used. A value that is not a number raises `Invalid channel ID.` |

## Return value

- **Type**: String `"true"` or `"false"`.
- `false` also when the channel cannot be found.

## Behavior

- Because only the name is checked, `ticket-john` and `my-ticketing-room` both give `true`, while a ticket channel renamed without the word gives `false`. Do not use it as an authorization guard.
- Channels created by `$newTicket` are named `ticket-...`.

## Examples

### Ticket validation

```bdfd
$title[Ticket Verification]
$description[Channel <#$channelID> ticket status: **$isTicket**]
$color[#5865F2]
```

### Only inside tickets

```bdfd
$onlyIf[$isTicket==true;This command only works in ticket channels.]
$sendMessage[Ticket command executed.]
```
