---
layout: doc
title: $isTicket — incomplete compatibility
category: "Moderation"
function_name: isTicket
api_type: bdfd
status: incomplete
syntax: $isTicket
description: Resolves a channel.isTicket placeholder, but the current ticket helper does not establish a persistent ticket marker.
---

# $isTicket

The compiler maps this function to `((channel.isTicket))`. The current `$newTicket` channel executor does not establish a persistent ticket marker, so this placeholder is not a reliable ticket detector. Do not assume it always returns `true` or `false` or use it as an authorization guard.

Track created ticket IDs in scoped storage and compare the current channel with that data. Names beginning with `ticket-` are not sufficient to authenticate a ticket.

Read the [Support Ticket System Guide](/docs/tickets/), the [channel Blocks reference](/docs/blocks-channels/) for explicit creation and closure, and the [execution model](/docs/execution-model/) for compatibility rules.
