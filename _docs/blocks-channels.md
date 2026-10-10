---
layout: doc
title: Blocks — channels, permissions and tickets
category: "Blocks"
api_type: blocks
description: Create Channel, Edit Channel Permissions and Remove Channel with the real blocks of the app; explicit ticket creation instead of incomplete BDFD helpers.
---

# Channel Blocks

> 💡 **Resource:** Every field of every block is listed in the **[Complete Blocks Dictionary](/docs/blocks-dictionary/)**, and a detailed walkthrough is in the **[Ticket System Guide](/docs/tickets/)**.

## Create Channel

Requires a guild context and the bot's Manage Channels permission. The block's result is the channel ID (read it with `((action.<key>))`); a failure raises an action error.

{% app_block type="createChannel" open="true" %}

Use **Category Id**, the parent category's ID, to place the channel in a category.

## Edit Channel Permissions

Edits one permission overwrite of a channel. The bot needs permission to change the channel's overwrites. Each permission in the **Permissions** editor is tri-state: unset (inherit), allow or deny.

{% app_block type="editChannelPermissions" open="true" %}

## Explicit ticket sequence

Create a **private parent category first**, with access denied to everyone and allowed for the bot and staff, and use its ID below. The sequence creates a text channel, grants its creator *View Channel*, *Send Messages* and *Read Message History*, sends a welcome, and replies to the slash interaction.

<div class="block-flow-canvas my-6">
{% app_block example="ticket_create_channel" %}
{% include block_connector.html %}
{% app_block example="ticket_permissions" %}
{% include block_connector.html %}
{% app_block example="ticket_welcome" %}
{% include block_connector.html %}
{% app_block example="ticket_confirm" %}
</div>

This sequence is the channel creation step, not a complete ticket lifecycle. Store the created ID in scoped storage to track open tickets and enforce limits. Review inherited staff/bot permissions. Creation and permission updates are separate operations: if an update fails, the channel can still exist and requires cleanup or repair.

## Remove Channel

The **Channel Id** is required. Requires Manage Channels; the result is the deleted ID. For a close command, verify the caller's permission and confirm the channel ID against stored ticket data before this block. A channel's name alone is not proof that it is a ticket.

<div class="block-flow-canvas my-6">
{% app_block example="ticket_remove_channel" %}
</div>

Deletion cannot be undone. *Update Channel* edits a channel; archived/locked settings are thread-specific and do not delete a text-channel ticket.
