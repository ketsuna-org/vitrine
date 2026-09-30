---
layout: doc
title: $closeTicket — incomplete compatibility
category: "Moderation"
function_name: closeTicket
api_type: bdfd
status: incomplete
syntax: $closeTicket[(errorMessage)]
description: Incomplete ticket helper. Emits a channel update, not deletion; use an explicit removeChannel action after validating stored ticket data.
---

# $closeTicket

This helper is **incomplete**. The compiler emits an `updateChannel` action with `archived: true` and `locked: true` for the current channel. These are thread settings, not text-channel deletion.

The optional argument is passed as `errorMessage`. It is not an authorization check and does not prevent a caller from closing a ticket. The current channel executor does not implement a complete ticket-marker validation for this helper.

Do not rely on it to delete a channel created by `$newTicket`, validate a ticket or enforce staff permissions. In particular, placing `$closeTicket[Only moderators can close this ticket]` in a denied branch is not a permission guard.

For an explicit close action, validate the caller and compare the target ID with stored ticket data, then use [removeChannel](/docs/blocks-channels/#removechannel). Save any required transcript first. Send the interaction response before deleting its channel.

See the complete guide: [Support Ticket System Guide](/docs/tickets/).

## Examples

### Recommended Modern Pattern vs Legacy Helper

```bdfd
;; For production private tickets, delete the channel explicitly:
$title[Support Ticket Closed 🔒]
$description[Ticket closed by <@$authorID>. This channel will be removed.]
$color[#DA373C]
$sendMessage[]
$deleteChannels[$channelID]
```
