---
layout: doc
title: $newTicket — incomplete compatibility
category: "Moderation"
function_name: newTicket
api_type: bdfd
status: incomplete
syntax: $newTicket[name;(categoryID)]
description: Incomplete ticket helper. Compiles to channel creation without a complete private-ticket lifecycle; use channel Blocks instead.
---

# $newTicket

This helper is **incomplete** in the current Dart compiler/runtime. Do not use it as a ready-made private support-ticket system.

The compiler reads the channel **name first** and category ID second. It emits a `createChannel` action with `parentId` and `isTicket`, but the channel executor reads `categoryId` and does not implement the `isTicket` marker. Consequently, this helper does not reliably place the channel in the requested category or establish ticket recognition.

It does not configure private creator/staff permissions, send an optional welcome message, enforce ticket limits or provide the documented inline channel-ID return that older examples assumed. There is no third welcome-message parameter in this builder.

For a working channel creation sequence, use [Channel and permission Blocks](/docs/blocks-channels/): `createChannel` with `categoryId`, explicit permissions, a welcome message and storage of the created ID. Configure a private parent category first. Use the action result rather than nesting this helper in a temporary-variable assignment.

See also [Support Ticket System Guide](/docs/tickets/), [$closeTicket](/docs/closeticket/), [$isTicket](/docs/isticket/) and [Execution model](/docs/execution-model/).
