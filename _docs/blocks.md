---
layout: doc
title: Blocks — Visual No-Code Programming Reference
category: "Blocks"
api_type: blocks
description: Complete guide to the Bot Creator visual Blocks system. Block anatomy, mobile visual flow, step-by-step beginner projects, and bidirectional equivalence with BDScript.
permalink: /docs/blocks/
---

The **Blocks** system is Bot Creator's visual programming engine. Inspired by modular snap-together card environments (like Scratch), it enables creators on iOS, Android, and Desktop to build complete Discord bots without writing a single line of raw code.

Blocks run directly on the native Dart engine. Each block compiles into a structured, typed, deterministic `Action` with inputs, outputs, and a unified error lifecycle handler.

---

## 1. Block Anatomy

In the mobile app, blocks are represented as rounded cards stacked vertically, connected by flow lines:

<div class="block-flow-canvas my-6">
  <div class="scratch-block-card block-cat-messages" data-native-action='{&quot;type&quot;:&quot;sendMessage&quot;,&quot;payload&quot;:{&quot;channelId&quot;:&quot;((channel.id))&quot;,&quot;content&quot;:&quot;Hello ((user.username))! Welcome to ((guild.name)).&quot;,&quot;tts&quot;:false}}'>
    <div class="scratch-block-header">
      <div class="scratch-block-strip"></div>
      <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#send"></use></svg>
      <span class="scratch-block-title">SEND A MESSAGE</span>
      <span class="scratch-block-badge">Key: my_message</span>
    </div>
    <div class="scratch-block-body">
      <div class="scratch-block-field">
        <span class="scratch-block-label">
          <span>Target channel</span>
          <span class="text-[10px] font-mono text-[#B19DF7]">string</span>
        </span>
        <div class="scratch-block-input"><span class="var-tag">((channel.id))</span></div>
      </div>
      <div class="scratch-block-field">
        <span class="scratch-block-label">
          <span>Message text content</span>
          <span class="text-[10px] font-mono text-[#B19DF7]">string</span>
        </span>
        <div class="scratch-block-input">Hello <span class="var-tag">((user.username))</span>! Welcome to <span class="var-tag">((guild.name))</span>.</div>
      </div>
      <div class="scratch-block-toggle-row">
        <span class="text-xs font-semibold text-on-surface">Automatically pin message</span>
        <span class="sim-switch"></span>
      </div>
    </div>
  </div>

  <div class="scratch-block-connector">
    <div class="scratch-block-connector-line"></div>
    <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
    <div class="scratch-block-connector-add">+</div>
  </div>

  <div class="scratch-block-card block-cat-interactions" data-native-action='{&quot;type&quot;:&quot;respondWithMessage&quot;,&quot;payload&quot;:{&quot;content&quot;:&quot;Message sent to the channel!&quot;,&quot;ephemeral&quot;:true}}'>
    <div class="scratch-block-header">
      <div class="scratch-block-strip"></div>
      <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#chat"></use></svg>
      <span class="scratch-block-title">RESPOND TO INTERACTION</span>
      <span class="scratch-block-badge">Terminal</span>
    </div>
    <div class="scratch-block-body">
      <div class="scratch-block-field">
        <span class="scratch-block-label">Text content</span>
        <div class="scratch-block-input">Message sent to the channel!</div>
      </div>
      <div class="scratch-block-toggle-row">
        <span class="text-xs font-semibold text-on-surface">Ephemeral Reply (visible only to you)</span>
        <span class="sim-switch active"></span>
      </div>
    </div>
  </div>
</div>

### Underlying JSON Structure

Each block corresponds to an `Action` object serialized in the bot:

```json
{
  "type": "respondWithMessage",
  "key": "welcome_reply",
  "enabled": true,
  "depend_on": [],
  "error": {
    "mode": "stop",
    "jumpToActionId": null,
    "skipCount": 0
  },
  "payload": {
    "content": "Hello ((user.username))! Welcome to ((guild.name)).",
    "ephemeral": true
  }
}
```

### Field Definitions

| Field | Type | Description |
|---|---|---|
| `type` | String | Exact block identifier corresponding to `BotCreatorActionType` (e.g. `sendMessage`, `createChannel`, `ifBlock`). |
| `payload` | Object | Dictionary of block parameters (IDs, text, booleans, embeds, options). |
| `key` | String | Optional unique identifier assigned to the block output for subsequent references (`((action.key))`). |
| `enabled` | Boolean | Default: `true`. If `false`, the engine skips the action without raising an error. |
| `depend_on` | Array&lt;String&gt; | Keys of prerequisite actions that must execute before this block runs. |
| `error` | Object | Error handling behavior: `mode` (`stop`, `continue`, `jump`, `skip`). |

---

## 2. Inputs, Outputs, and Context Variables

### Discord Context Variables `((...))`
Input fields accept dynamic placeholders resolved at runtime:
- **User**: `((user.id))`, `((user.username))`, `((user.avatar))`
- **Guild / Server**: `((guild.id))`, `((guild.name))`, `((guild.memberCount))`
- **Channel**: `((channel.id))`, `((channel.name))`
- **Slash Options**: `((opts.option_name))` (or `((opts.option_name.id))` for IDs)
- **Components**: `((interaction.customId))`, `((interaction.userId))`

### Block Outputs `((action.<key>))`
When a block produces an identifier or result (for example `createChannel` creates a channel and returns its Snowflake ID, or `httpRequest` returns a JSON object), assign it a **Key** in the editor (e.g. `ticket_chan`).
Subsequent blocks access it via:
```text
((action.ticket_chan))
```

---

## 3. Step-by-Step Beginner Guide: 3 Core Projects

Each project includes an interactive dual view: see how it connects in the mobile app or read the equivalent script code, along with a simulated Discord visual preview!

---

### Project 1: The `/ping` Slash Command

**Goal:** Build a slash command that replies with the bot's latency in a clean embed.

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
      
      <!-- Trigger -->
      <div class="scratch-block-card block-cat-entrypoint" data-native-trigger='{&quot;type&quot;:&quot;slash&quot;,&quot;name&quot;:&quot;ping&quot;}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#terminal"></use></svg>
          <span class="scratch-block-title">SLASH COMMAND: /ping</span>
          <span class="scratch-block-badge">Trigger</span>
        </div>
        <div class="scratch-block-body">
          <div class="text-xs text-on-surface-variant">Command name: <code>/ping</code> • Description: Measures bot latency.</div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action -->
      <div class="scratch-block-card block-cat-interactions" data-native-action='{&quot;type&quot;:&quot;respondWithMessage&quot;,&quot;payload&quot;:{&quot;embeds&quot;:[{&quot;title&quot;:&quot;🏓 Pong!&quot;,&quot;description&quot;:&quot;WebSocket API Latency: ((bot.ping))ms&quot;,&quot;color&quot;:&quot;#5865F2&quot;}],&quot;ephemeral&quot;:false}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#chat"></use></svg>
          <span class="scratch-block-title">RESPOND TO INTERACTION</span>
          <span class="scratch-block-badge">Terminal</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Embed Title</span>
            <div class="scratch-block-input">🏓 Pong!</div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Embed Description</span>
            <div class="scratch-block-input">WebSocket API Latency: <span class="var-tag">((bot.ping))</span>ms</div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Embed Color</span>
            <div class="scratch-block-input">#5865F2 <span class="text-xs text-on-surface-variant font-sans">(Blurple)</span></div>
          </div>
          <div class="scratch-block-toggle-row">
            <span class="text-xs font-semibold text-on-surface">Ephemeral Reply</span>
            <span class="sim-switch"></span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="dual-tab-panel">
<pre><code class="language-bdfd">;; Native slash command reply (no $sendMessage needed)
$title[🏓 Pong!]
$description[WebSocket API Latency: **$ping ms**]
$color[#5865F2]
</code></pre>
  </div>
</div>

#### Realistic Discord Preview

<div class="discord-simulator-frame">
  <div class="discord-msg-row">
    <div class="discord-avatar">🤖</div>
    <div class="discord-msg-content">
      <div class="discord-header">
        <span class="discord-username">Bot Creator Assistant</span>
        <span class="discord-bot-tag">BOT ✔</span>
        <span class="discord-timestamp">Today at 3:00 PM</span>
      </div>
      <div class="discord-embed" style="--embed-color: #5865F2;">
        <div class="discord-embed-title">🏓 Pong!</div>
        <div class="discord-embed-desc">WebSocket API Latency: <strong>24 ms</strong></div>
      </div>
    </div>
  </div>
</div>

---

### Project 2: Automatic Welcome Message

**Goal:** When a new member joins the server, send a personalized welcome message to the `#welcome` channel.

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
      
      <!-- Trigger -->
      <div class="scratch-block-card block-cat-entrypoint" data-native-trigger='{&quot;type&quot;:&quot;event&quot;,&quot;event&quot;:&quot;guildMemberAdd&quot;}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#person_add"></use></svg>
          <span class="scratch-block-title">EVENT: guildMemberAdd</span>
          <span class="scratch-block-badge">Event</span>
        </div>
        <div class="scratch-block-body">
          <div class="text-xs text-on-surface-variant">Triggered automatically whenever a user joins the Discord server.</div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action -->
      <div class="scratch-block-card block-cat-messages" data-native-action='{&quot;type&quot;:&quot;sendMessage&quot;,&quot;payload&quot;:{&quot;channelId&quot;:&quot;112233445566778899&quot;,&quot;content&quot;:&quot;Welcome &lt;@((user.id))&gt; to **((guild.name))**! 🎉 We are now ((guild.memberCount)) members!&quot;}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#send"></use></svg>
          <span class="scratch-block-title">SEND A MESSAGE</span>
          <span class="scratch-block-badge">Action</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Target channel (#welcome channel ID)</span>
            <div class="scratch-block-input">112233445566778899</div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Text content</span>
            <div class="scratch-block-input">Welcome &lt;@<span class="var-tag">((user.id))</span>&gt; to **<span class="var-tag">((guild.name))</span>**! 🎉 We are now <span class="var-tag">((guild.memberCount))</span> members!</div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="dual-tab-panel">
<pre><code class="language-bdfd">;; Triggered on guildMemberAdd event
$useChannel[112233445566778899]
Welcome &lt;@$authorID&gt; to **$serverName**! 🎉
We are now $membersCount members!
</code></pre>
  </div>
</div>

#### Realistic Discord Preview

<div class="discord-simulator-frame">
  <div class="discord-msg-row">
    <div class="discord-avatar">🤖</div>
    <div class="discord-msg-content">
      <div class="discord-header">
        <span class="discord-username">Bot Creator Assistant</span>
        <span class="discord-bot-tag">BOT ✔</span>
        <span class="discord-timestamp">Today at 3:05 PM</span>
      </div>
      <div>Welcome <span class="bg-[#5865F2]/20 text-[#B19DF7] px-1 rounded">@Jeremy</span> to <strong>Bot Creator Community</strong>! 🎉 We are now 1,420 members!</div>
    </div>
  </div>
</div>

---

### Project 3: Interactive Role Assignment via Button

**Goal:** Deploy a verification panel with an interactive button. When clicked, the user receives a role without public chat clutter.

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
      
      <!-- Trigger -->
      <div class="scratch-block-card block-cat-entrypoint" data-native-trigger='{&quot;type&quot;:&quot;event&quot;,&quot;event&quot;:&quot;interactionCreate&quot;,&quot;customId&quot;:&quot;verify_member&quot;}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#touch_app"></use></svg>
          <span class="scratch-block-title">BUTTON CLICK: verify_member</span>
          <span class="scratch-block-badge">Trigger</span>
        </div>
        <div class="scratch-block-body">
          <div class="text-xs text-on-surface-variant">Triggered when the button with customId <code>verify_member</code> is pressed.</div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 1: Add Role -->
      <div class="scratch-block-card block-cat-moderation" data-native-action='{&quot;type&quot;:&quot;addRole&quot;,&quot;payload&quot;:{&quot;userId&quot;:&quot;((user.id))&quot;,&quot;roleId&quot;:&quot;998877665544332211&quot;}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#person_add_alt_1"></use></svg>
          <span class="scratch-block-title">ADD A ROLE</span>
          <span class="scratch-block-badge">Moderation</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Target user</span>
            <div class="scratch-block-input"><span class="var-tag">((user.id))</span></div>
          </div>
          <div class="scratch-block-field">
            <span class="scratch-block-label">Role identifier (Member Role ID)</span>
            <div class="scratch-block-input">998877665544332211</div>
          </div>
        </div>
      </div>

      <div class="scratch-block-connector">
        <div class="scratch-block-connector-line"></div>
        <svg class="reicon scratch-block-connector-arrow" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#arrow_drop_down"></use></svg>
      </div>

      <!-- Action 2: Ephemeral Reply -->
      <div class="scratch-block-card block-cat-interactions" data-native-action='{&quot;type&quot;:&quot;respondWithMessage&quot;,&quot;payload&quot;:{&quot;content&quot;:&quot;✅ Congratulations ((user.username))! You have been given the Member role.&quot;,&quot;ephemeral&quot;:true}}'>
        <div class="scratch-block-header">
          <div class="scratch-block-strip"></div>
          <svg class="reicon scratch-block-icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#chat"></use></svg>
          <span class="scratch-block-title">RESPOND TO INTERACTION</span>
          <span class="scratch-block-badge">Terminal</span>
        </div>
        <div class="scratch-block-body">
          <div class="scratch-block-field">
            <span class="scratch-block-label">Text content</span>
            <div class="scratch-block-input">✅ Congratulations <span class="var-tag">((user.username))</span>! You have been given the Member role.</div>
          </div>
          <div class="scratch-block-toggle-row">
            <span class="text-xs font-semibold text-on-surface">Ephemeral Reply</span>
            <span class="sim-switch active"></span>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="dual-tab-panel">
<pre><code class="language-bdfd">;; Button click event on verify_member
$giveRole[$authorID;998877665544332211]
$ephemeral
✅ Congratulations $username! You have been given the Member role.
</code></pre>
  </div>
</div>

#### Realistic Discord Preview

<div class="discord-simulator-frame">
  <div class="discord-msg-row">
    <div class="discord-avatar">🤖</div>
    <div class="discord-msg-content">
      <div class="discord-header">
        <span class="discord-username">Bot Creator Assistant</span>
        <span class="discord-bot-tag">BOT ✔</span>
        <span class="discord-timestamp">Today at 3:10 PM</span>
      </div>
      <div>✅ Congratulations <strong>Jeremy</strong>! You have been given the Member role.</div>
      <div class="discord-ephemeral-notice">
        <svg class="reicon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/reicon.svg' | relative_url }}#visibility_off"></use></svg>
        <span>Only you can see this • <a href="#" class="underline hover:text-white" onclick="return false;">Dismiss message</a></span>
      </div>
    </div>
  </div>
</div>

---

## 4. Explore All Blocks

To browse all **112 blocks** available in the mobile app with their fields, default values, and script equivalents:

- 📖 **[Complete Blocks Dictionary](/docs/blocks-dictionary/)** — Exhaustive catalog of all 12 categories and 100% of actions.
- 🎫 **[Support Ticket System Guide](/docs/tickets/)** — Architecture and production deployment of private support channels.
- ⚙️ **[Execution Model & Best Practices](/docs/execution-model/)** — Acknowledgment rules, state management, and optimization tips.
