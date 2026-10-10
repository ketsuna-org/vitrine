---
layout: doc
title: Complete Guide — Support Ticket System
category: "Blocks"
api_type: general
description: Robust, production-ready Discord ticket system. Private channel creation, granular permission management, interactive button messages, and clean deletion.
permalink: /docs/tickets/
---

# Complete Guide — Support Ticket System

Building a private support system on Discord requires orchestrating **channel creation**, **explicit permission configuration**, **interactive components** (Discord buttons), and **clean deletion** upon closing.

> [!CAUTION]
> **Deprecated legacy functions:** Do not use `$newTicket` or `$closeTicket` for production bots. These legacy helpers create public channels without access restrictions and do not reliably clean up text channels. Exclusively use the proven modular pattern documented below.

---

## 1. Ticket System Architecture

To ensure total confidentiality for conversations between the user and staff:

```text
[ Parent Category: 🔒 Private Support ]  <── @everyone: View Channel = DENIED
       │
       ├── [ Ticket Channel: #ticket-username ]
       │      ├── Staff & Bot (Inherited permissions: View, Send, Manage)
       │      ├── Ticket Creator (Explicit permission: View, Send, History)
       │      │
       │      └── [ Welcome message with Embed & Red Button "Close Ticket" ]
```

1. **Private Parent Category**: Set up a Discord category where `@everyone` has `View Channel` disabled. The bot and moderation roles are granted administrative or management rights.
2. **Channel Creation**: When `/ticket` executes, create a text channel nested under this category.
3. **Explicit Permissions**: Apply an explicit permission overwrite for the member who triggered the command (`allow: 68608` = View Channel + Send Messages + Read Message History).
4. **Welcome Message & Button**: Immediately send a welcome embed into the channel with an interactive button (`customId: close_ticket`, Danger / Red style).
5. **Ephemeral Confirmation**: Reply to the slash command with an ephemeral message (visible only to the author) containing a clickable channel link `<#ID>`.
6. **Closing & Deletion**: When the button is clicked, acknowledge the interaction, wait 3 seconds for confirmation, then permanently delete the channel.

---

## 2. Step 1: `/ticket` Command (Creation & Welcome)

<div class="block-flow-canvas my-6">
{% app_entry kind="slash" name="ticket" %}
{% include block_connector.html %}
{% app_block example="ticket_chan" %}
{% include block_connector.html %}
{% app_block example="ticket_chan_permissions" %}
{% include block_connector.html %}
{% app_block example="ticket_welcome_panel" %}
{% include block_connector.html %}
{% app_block example="ticket_created_reply" %}
</div>

The last three blocks depend on the channel created by the first one: they read its ID with `((action.ticket_chan))`, the **Action Key** of *Create Channel*. Replace the category ID with your private support category.

<details class="block-json-ref">
<summary>The same flow written in BDFD Code mode</summary>
<pre><code class="language-bdfd">;; 1. Create text channel under the private category
$var[ticketChan;$createChannel[ticket-$username;text;123456789012345678]]

;; 2. Grant permissions to creator (+viewchannel, +sendmessages, +readmessagehistory)
$editChannelPerms[$var[ticketChan];$authorID;+viewchannel;+sendmessages;+readmessagehistory]

;; 3. Send welcome embed with close button to the new channel
$useChannel[$var[ticketChan]]
$title[Support &amp; Help]
$description[Hello &lt;@$authorID&gt;! Please describe your issue here.\nA support team member will assist you shortly.\n\nTo close this ticket, click the red button below.]
$color[#5865F2]
$addButton[no;close_ticket;Close Ticket;danger]

;; 4. Reset channel and acknowledge the slash command ephemerally (no double $sendMessage!)
$useChannel[]
$ephemeral
✅ Your support ticket has been created: &lt;#$var[ticketChan]&gt;
</code></pre>
</details>

### Discord Visual Preview: Immediate Confirmation

Here is what the user immediately sees in the channel where they ran `/ticket`:

<div class="discord-simulator-frame">
  <div class="discord-msg-row">
    <div class="discord-avatar">🤖</div>
    <div class="discord-msg-content">
      <div class="discord-header">
        <span class="discord-username">Bot Creator Assistant</span>
        <span class="discord-bot-tag">BOT ✔</span>
        <span class="discord-timestamp">Today at 2:32 PM</span>
      </div>
      <div>✅ Your support ticket has been created: <strong class="text-[#B19DF7]">#ticket-jeremy</strong></div>
      <div class="discord-ephemeral-notice">
        <svg class="reicon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#visibility_off"></use></svg>
        <span>Only you can see this • <a href="#" class="underline hover:text-white" onclick="return false;">Dismiss message</a></span>
      </div>
    </div>
  </div>
</div>

### Discord Visual Preview: Dedicated Private Channel

Here is what is posted inside the `#ticket-jeremy` channel:

<div class="discord-simulator-frame">
  <div class="discord-msg-row">
    <div class="discord-avatar">🤖</div>
    <div class="discord-msg-content">
      <div class="discord-header">
        <span class="discord-username">Bot Creator Assistant</span>
        <span class="discord-bot-tag">BOT ✔</span>
        <span class="discord-timestamp">Today at 2:32 PM</span>
      </div>
      
      <!-- Embed -->
      <div class="discord-embed" style="--embed-color: #5865F2;">
        <div class="discord-embed-title">🎫 Support &amp; Help</div>
        <div class="discord-embed-desc">
          Hello <span class="bg-[#5865F2]/20 text-[#B19DF7] px-1 rounded">@Jeremy</span>! Please describe your issue below.<br>
          A member of the support team will take care of your request.<br><br>
          <em>When your issue is resolved, click the button below to close the ticket.</em>
        </div>
        <div class="discord-embed-footer">
          <span>Bot Creator Tickets • ID: 1234567890</span>
        </div>
      </div>

      <!-- Action Button -->
      <div class="discord-components-row">
        <button class="discord-btn discord-btn-danger" type="button">
          <svg class="reicon text-sm" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#lock"></use></svg>
          <span>Close Ticket</span>
        </button>
      </div>

    </div>
  </div>
</div>

---

## 3. Step 2: Closing the Ticket (Button Click or `/ticket-close`)

When a member or moderator clicks the **Close Ticket** button (`customId: close_ticket`), Discord emits the `interactionCreate` event.

<div class="block-flow-canvas my-6">
{% app_entry event="interactionCreate" custom_id="close_ticket" %}
{% include block_connector.html %}
{% app_block example="ticket_close_reply" %}
{% include block_connector.html %}
{% app_block example="ticket_close_wait" %}
{% include block_connector.html %}
{% app_block example="ticket_remove_channel" %}
</div>

<details class="block-json-ref">
<summary>The same flow written in BDFD Code mode</summary>
<pre><code class="language-bdfd">;; 1. Immediately acknowledge the click to prevent the Discord 3s timeout
🔒 Close requested by $username. Deleting this channel in 3 seconds...

;; 2. Clean wait timer
$wait[3s]

;; 3. Permanently delete the ticket channel
$deleteChannels[$channelID]
</code></pre>
</details>

### Discord Visual Preview: Closure Notification

<div class="discord-simulator-frame">
  <div class="discord-msg-row">
    <div class="discord-avatar">🤖</div>
    <div class="discord-msg-content">
      <div class="discord-header">
        <span class="discord-username">Bot Creator Assistant</span>
        <span class="discord-bot-tag">BOT ✔</span>
        <span class="discord-timestamp">Today at 2:35 PM</span>
      </div>
      <div>🔒 Close requested by <strong>Jeremy</strong>. Deleting this channel in 3 seconds...</div>
    </div>
  </div>
</div>

---

## 4. Saved Structure (reference for API and MCP users)

The blocks above are stored as the following `Action` objects and run in order by the native engine. You never write this by hand in the app; it is the format to use through the API or the MCP.

<details class="block-json-ref">
<summary>Show the JSON of the two flows</summary>


### Ticket Creation
```json
[
  {
    "type": "createChannel",
    "key": "ticket_chan",
    "enabled": true,
    "payload": {
      "name": "ticket-((user.username))",
      "type": "text",
      "categoryId": "123456789012345678"
    }
  },
  {
    "type": "editChannelPermissions",
    "depend_on": ["ticket_chan"],
    "enabled": true,
    "payload": {
      "channelId": "((action.ticket_chan))",
      "targetType": "member",
      "targetId": "((user.id))",
      "permissions": {
        "viewChannel": "allow",
        "sendMessages": "allow",
        "readMessageHistory": "allow"
      }
    }
  },
  {
    "type": "sendMessage",
    "depend_on": ["ticket_chan"],
    "enabled": true,
    "payload": {
      "channelId": "((action.ticket_chan))",
      "content": "Hello <@((user.id))>!",
      "embeds": [
        {
          "title": "🎫 Support & Help",
          "description": "Welcome to your private support channel. Please describe your issue below.",
          "color": "#5865F2"
        }
      ],
      "components": {
        "items": [
          {
            "type": "actionRow",
            "components": [
              {
                "type": "button",
                "customId": "close_ticket",
                "label": "Close Ticket",
                "style": "danger"
              }
            ]
          }
        ]
      }
    }
  },
  {
    "type": "respondWithMessage",
    "depend_on": ["ticket_chan"],
    "enabled": true,
    "payload": {
      "content": "✅ Your support ticket has been created: <#((action.ticket_chan))>",
      "ephemeral": true
    }
  }
]
```

### Ticket Closing
```json
[
  {
    "type": "respondWithMessage",
    "enabled": true,
    "payload": {
      "content": "🔒 Close requested. Deleting this channel in 3 seconds...",
      "ephemeral": false
    }
  },
  {
    "type": "wait",
    "enabled": true,
    "payload": {
      "duration": "3s"
    }
  },
  {
    "type": "removeChannel",
    "enabled": true,
    "payload": {
      "channelId": "((channel.id))"
    }
  }
]
```

</details>

---

## 5. Lightweight Alternative: Tickets via Private Threads

If your server is approaching Discord's 500-channel limit, or if you prefer keeping history organized without creating entire text channels, you can use **private threads**:

1. Create a general ticket landing channel `#support-tickets`.
2. When `/ticket` is run, use the *Create Thread* block in that channel with **Type** set to `private` (any other value creates a public thread).
3. Add the user with the *Add Thread Member* block.

<div class="block-flow-canvas my-6">
{% app_entry kind="slash" name="ticket" %}
{% include block_connector.html %}
{% app_block example="thread_create" %}
{% include block_connector.html %}
{% app_block example="thread_add_member" %}
</div>

To archive and close the ticket without destroying it, the engine's *Update Channel* block reads `archived` and `locked` payload keys for a thread. The editor does not show these two fields, so set them through the API or the MCP.
