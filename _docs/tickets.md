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

> [!NOTE]
> **Script View (BDFD) limits:** `$createChannel[name;type;(categoryId)]` returns an empty string, so the new channel ID cannot be captured in a script. The BDFD tab below therefore uses `$newTicket[category;noSubject;inTicket;toUser;error;(number);(returnId)]`, which creates a text channel named `ticket-<number or slugified username>` whose permissions deny `@everyone` View Channel and allow the author (and the bot) View Channel, Send Messages and Read Message History. It posts `inTicket` in the new channel (`{subject}` and `{channel}` are replaced) and appends `toUser` to the response. Embeds and buttons in the ticket channel are only available with the Blocks (action) version.

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

<div class="dual-view-tabs">
  <div class="dual-view-nav">
    <button class="dual-tab-btn active" type="button">
      <svg class="reicon tab-accent" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#dashboard"></use></svg>
      <span>Blocks View (App Mode)</span>
    </button>
    <button class="dual-tab-btn" type="button">
      <svg class="reicon tab-accent" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#code"></use></svg>
      <span>Script View (BDFD / BDScript)</span>
    </button>
  </div>

  <div class="dual-tab-panel active">
    <div class="block-flow-canvas">
      
      <!-- Entry Point -->
      <div class="scratch-block-card block-cat-entrypoint" data-native-trigger='{&quot;type&quot;:&quot;slash&quot;,&quot;name&quot;:&quot;ticket&quot;}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#terminal"></use></svg>
          <span class="scratch-block-title">SLASH COMMAND: /ticket</span>
          <span class="scratch-block-badge">Trigger</span>
        </div>
        <div class="scratch-block-body">
          <div class="text-xs text-on-surface-variant">Triggered when a member uses the slash command <code>/ticket</code> on the server.</div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 1: Create Channel -->
      <div class="scratch-block-card block-cat-channels" data-native-action='{&quot;type&quot;:&quot;createChannel&quot;,&quot;key&quot;:&quot;ticket_chan&quot;,&quot;enabled&quot;:true,&quot;payload&quot;:{&quot;name&quot;:&quot;ticket-((user.username))&quot;,&quot;type&quot;:&quot;text&quot;,&quot;categoryId&quot;:&quot;123456789012345678&quot;}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#add_box"></use></svg>
          <span class="scratch-block-title">CREATE A CHANNEL</span>
          <span class="scratch-block-badge">Key: ticket_chan</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Channel name</span>
            <div class="scratch-block-input">ticket-<span class="var-tag">((user.username))</span></div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Channel type</span>
            <div class="scratch-block-input">Text (0)</div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Parent Category (Support Category ID)</span>
            <div class="scratch-block-input">123456789012345678</div>
          </div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 2: Edit Permissions -->
      <div class="scratch-block-card block-cat-channels" data-native-action='{&quot;type&quot;:&quot;editChannelPermissions&quot;,&quot;depend_on&quot;:[&quot;ticket_chan&quot;],&quot;enabled&quot;:true,&quot;payload&quot;:{&quot;channelId&quot;:&quot;((action.ticket_chan))&quot;,&quot;targetType&quot;:&quot;member&quot;,&quot;targetId&quot;:&quot;((user.id))&quot;,&quot;allow&quot;:&quot;68608&quot;,&quot;deny&quot;:&quot;0&quot;}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#lock_open"></use></svg>
          <span class="scratch-block-title">EDIT PERMISSIONS</span>
          <span class="scratch-block-badge">Depends: ticket_chan</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Channel ID</span>
            <div class="scratch-block-input"><span class="var-tag">((action.ticket_chan))</span></div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Target (User)</span>
            <div class="scratch-block-input"><span class="var-tag">((user.id))</span></div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Allowed permissions (Bitmask or flags)</span>
            <div class="scratch-block-input">68608 <span class="text-xs text-on-surface-variant font-sans">(View Channel + Send + Read History)</span></div>
          </div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 3: Send Message in Ticket -->
      <div class="scratch-block-card block-cat-messages" data-native-action='{&quot;type&quot;:&quot;sendMessage&quot;,&quot;depend_on&quot;:[&quot;ticket_chan&quot;],&quot;enabled&quot;:true,&quot;payload&quot;:{&quot;channelId&quot;:&quot;((action.ticket_chan))&quot;,&quot;content&quot;:&quot;Hello &lt;@((user.id))&gt;!&quot;,&quot;embeds&quot;:[{&quot;title&quot;:&quot;🎫 Support &amp; Help&quot;,&quot;description&quot;:&quot;Welcome to your private support channel. Please describe your issue below.&quot;,&quot;color&quot;:&quot;#5865F2&quot;}],&quot;components&quot;:{&quot;items&quot;:[{&quot;type&quot;:&quot;actionRow&quot;,&quot;components&quot;:[{&quot;type&quot;:&quot;button&quot;,&quot;customId&quot;:&quot;close_ticket&quot;,&quot;label&quot;:&quot;Close Ticket&quot;,&quot;style&quot;:4}]}]}}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#send"></use></svg>
          <span class="scratch-block-title">SEND A MESSAGE (Ticket Channel)</span>
          <span class="scratch-block-badge">Depends: ticket_chan</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Target channel</span>
            <div class="scratch-block-input"><span class="var-tag">((action.ticket_chan))</span></div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Embed — Title &amp; Description</span>
            <div class="scratch-block-input">🎫 Support &amp; Help — Welcome &lt;@<span class="var-tag">((user.id))</span>&gt;!</div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Components (Action button)</span>
            <div class="scratch-block-input">Red Button [Close Ticket] | customId: close_ticket</div>
          </div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 4: Interaction Reply (Terminal) -->
      <div class="scratch-block-card block-cat-interactions" data-native-action='{&quot;type&quot;:&quot;respondWithMessage&quot;,&quot;depend_on&quot;:[&quot;ticket_chan&quot;],&quot;enabled&quot;:true,&quot;payload&quot;:{&quot;content&quot;:&quot;✅ Your support ticket has been created: &lt;#((action.ticket_chan))&gt;&quot;,&quot;ephemeral&quot;:true}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#chat"></use></svg>
          <span class="scratch-block-title">RESPOND TO INTERACTION (Slash Reply)</span>
          <span class="scratch-block-badge">Terminal</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Text content</span>
            <div class="scratch-block-input">✅ Your ticket has been created: &lt;#<span class="var-tag">((action.ticket_chan))</span>&gt;</div>
          </div>
          <div class="scratch-block-toggle-row">
            <span class="text-xs font-semibold text-on-surface">Ephemeral Reply (visible only to you)</span>
            <span class="sim-switch active"></span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="dual-tab-panel">
    <p class="text-sm text-on-surface-variant mb-4">BDScript code executed by the engine:</p>
<pre><code class="language-bdfd">$newTicket[123456789012345678;No subject given;Hello &lt;@$authorID&gt;! Please describe your issue here. A support team member will assist you shortly.;Your support ticket has been created: {channel};The ticket could not be created.]
</code></pre>
  </div>
</div>

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

<div class="dual-view-tabs">
  <div class="dual-view-nav">
    <button class="dual-tab-btn active" type="button">
      <svg class="reicon tab-accent" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#dashboard"></use></svg>
      <span>Blocks View (App Mode)</span>
    </button>
    <button class="dual-tab-btn" type="button">
      <svg class="reicon tab-accent" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#code"></use></svg>
      <span>Script View (BDFD / BDScript)</span>
    </button>
  </div>

  <div class="dual-tab-panel active">
    <div class="block-flow-canvas">
      
      <!-- Entry Point -->
      <div class="scratch-block-card block-cat-entrypoint" data-native-trigger='{&quot;type&quot;:&quot;event&quot;,&quot;event&quot;:&quot;interactionCreate&quot;,&quot;customId&quot;:&quot;close_ticket&quot;}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#touch_app"></use></svg>
          <span class="scratch-block-title">BUTTON CLICK: close_ticket</span>
          <span class="scratch-block-badge">Trigger</span>
        </div>
        <div class="scratch-block-body">
          <div class="text-xs text-on-surface-variant">Triggered when the red button with Custom ID <code>close_ticket</code> is clicked.</div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 1: Respond to Interaction -->
      <div class="scratch-block-card block-cat-interactions" data-native-action='{&quot;type&quot;:&quot;respondWithMessage&quot;,&quot;enabled&quot;:true,&quot;payload&quot;:{&quot;content&quot;:&quot;🔒 Close requested. Deleting this channel in 3 seconds...&quot;,&quot;ephemeral&quot;:false}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#chat"></use></svg>
          <span class="scratch-block-title">RESPOND TO INTERACTION</span>
          <span class="scratch-block-badge">Acknowledgment</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Notice message</span>
            <div class="scratch-block-input">🔒 Ticket closure requested by <span class="var-tag">((user.username))</span>. Deleting channel in 3 seconds...</div>
          </div>
          <div class="scratch-block-toggle-row">
            <span class="text-xs font-semibold text-on-surface">Ephemeral</span>
            <span class="sim-switch"></span>
          </div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 2: Wait -->
      <div class="scratch-block-card block-cat-logic" data-native-action='{&quot;type&quot;:&quot;wait&quot;,&quot;enabled&quot;:true,&quot;payload&quot;:{&quot;duration&quot;:&quot;3s&quot;}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#hourglass_empty"></use></svg>
          <span class="scratch-block-title">WAIT</span>
          <span class="scratch-block-badge">Timer</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Wait duration</span>
            <div class="scratch-block-input">3s</div>
          </div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 3: Remove Channel -->
      <div class="scratch-block-card block-cat-channels" data-native-action='{&quot;type&quot;:&quot;removeChannel&quot;,&quot;enabled&quot;:true,&quot;payload&quot;:{&quot;channelId&quot;:&quot;((channel.id))&quot;}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#remove_circle"></use></svg>
          <span class="scratch-block-title">DELETE CHANNEL</span>
          <span class="scratch-block-badge">Destruction</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Channel to delete</span>
            <div class="scratch-block-input"><span class="var-tag">((channel.id))</span></div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="dual-tab-panel">
    <p class="text-sm text-on-surface-variant mb-4">BDScript interaction handler:</p>
<pre><code class="language-bdfd">$closeTicket[This channel is not a ticket.]
</code></pre>
  </div>
</div>

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

## 4. Complete JSON Representation (Runtime Action Engine)

Here is the exact JSON structure stored in the database and executed sequentially by the native Dart runtime:

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
      "allow": "68608",
      "deny": "0"
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
                "style": 4
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

---

## 5. Lightweight Alternative: Tickets via Private Threads

If your server is approaching Discord's 500-channel limit, or if you prefer keeping history organized without creating entire text channels, you can use **Private Threads**:

1. Create a general ticket landing channel `#support-tickets`.
2. When `/ticket` is run, invoke the `createThread` action with `type: "privateThread"`.
3. Add the user with `addThreadMember`.
4. To archive and close the ticket without destroying it, use `updateChannel` with `archived: true` and `locked: true`.
