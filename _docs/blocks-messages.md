---
layout: doc
title: Blocks — messages and slash responses
category: "Blocks"
api_type: blocks
description: Respond with Message versus Send Message; content, embeds, channels and interaction context, shown with the real blocks of the app.
---

# Message Blocks

> 💡 **Resource:** Every field of every block is listed in the **[Complete Blocks Dictionary](/docs/blocks-dictionary/)**, and the introductory guide is **[Introduction to Blocks](/docs/blocks/)**.

Two blocks send messages. They look alike but answer different needs.

## Respond with Message

Replies to the active interaction (slash command, button, menu). Without an interaction, it falls back to a plain channel send when a channel is available, so it also works in prefix commands and event workflows. It is a **final** block: put nothing after it.

{% app_block type="respondWithMessage" open="true" %}

A simple private reply:

<div class="block-flow-canvas my-6">
{% app_block example="reply_hello" %}
</div>

An embed response does not need a separate *Send Message* block: fill the **Embeds** editor of *Respond with Message* directly.

<div class="block-flow-canvas my-6">
{% app_block example="ping_reply" %}
</div>

## Send Message

Sends a message to a channel (or a user, or as a reply, depending on **Target Type**). Use it in workflows and whenever the message must go somewhere other than the current interaction.

{% app_block type="sendMessage" open="true" %}

A workflow message to an explicit channel (replace the example ID with your channel's ID):

<div class="block-flow-canvas my-6">
{% app_block example="notify_channel" %}
</div>

A message must have content, an embed, components or an attachment. **Ephemeral** belongs to *Respond with Message*: it makes an interaction response private, and it does not turn an ordinary channel message into a private one. Components have their own editor: do not paste `$addButton` strings into the components of a block.
