---
layout: doc
title: Blocks — Visual No-Code Programming Reference
category: "Blocks"
api_type: blocks
description: How the Bot Creator Blocks editor works. What a block looks like, how its fields behave, and three step-by-step projects built with the real blocks of the app.
permalink: /docs/blocks/
---

The **Blocks** system is Bot Creator's visual editor. A command or an event workflow is a vertical sequence of blocks: you add them from a palette, fill their fields, and the native engine runs them in order. Every block you see on this site is drawn from the app's own block registry, so names, fields, hints and options are the ones you will find in the editor.

Each block is saved as a typed `Action` with inputs, an optional output key and an error policy (see [how a block is saved](#under-the-hood-how-a-block-is-saved)).

---

## 1. Block anatomy

This is a **Send Message** block as it appears in the editor. Tap the header to collapse or expand it, as in the app.

<div class="block-flow-canvas my-6">
{% app_block example="anatomy_send" %}
</div>

From left to right and top to bottom:

- **Icon tile and category.** The tile carries the colour of the block's family; the small uppercase line above the name is the category (here *Messages*). The block itself stays neutral, only the tile and that line are coloured.
- **Name.** The name shown in the palette and in the editor (*Send Message*). The grey line under it is the block's identifier (`sendMessage`), which is what you use with the API and the MCP; the app shows a one-line summary of the values there.
- **Fields.** One control per parameter, in a fixed order. A text field shows its hint until you type; a switch is an on/off option; a drop-down offers a fixed list; a bordered tile with a pencil opens a sub-editor (embeds, components, nested blocks…). A red `*` marks a required field.
- **Variables.** Text fields accept `((variables))` such as `((user.username))`; they are highlighted in violet.
- **Action Key.** An optional name for the block's result, readable later as `((action.<key>))`.
- **Advanced settings.** Under the fields, every block has **Action Key**, an **Enabled** switch and **On Error**: *Stop*, *Continue*, *Jump to action* or *Skip N actions*.
- **Menu (⋮).** Move up, Move down, Copy action, Duplicate, Paste above, Paste below, Documentation & guides and Delete.

A few blocks are **final**: they answer the interaction and nothing should come after them ({{ "" | block_final_names }}).

### Families and categories

The palette groups the blocks into {{ site.data.blocks_registry.blocks | map: "category" | uniq | size }} categories. Each category belongs to one of six colour families.

<table>
<thead><tr><th>Family</th><th>Colour</th><th>Categories</th></tr></thead>
<tbody>
{% for fam in site.data.blocks_registry.families %}<tr><td>{{ fam[1].label }}</td><td><span style="display:inline-block;width:12px;height:12px;border-radius:3px;background:{{ fam[1].color }};vertical-align:-1px"></span> <code>{{ fam[1].color }}</code></td><td>{{ fam[0] | block_family_categories }}</td></tr>
{% endfor %}
</tbody>
</table>

The complete list, with every field of every block, is in the **[Blocks Dictionary](/docs/blocks-dictionary/)**.

### The first block: the trigger

Every command starts with a fixed, non-removable **Command Trigger** block (for an event workflow it is an **Event trigger** block). It decides when the command runs and how it is built.

<div class="block-flow-canvas my-6">
{% app_entry kind="slash" name="ping" %}
</div>

A command is built either with **Visual (Blocks)**, with **BDFD Code**, or with **JavaScript**; the blocks described on this page belong to the first mode.

### Under the hood: how a block is saved

<details class="block-json-ref">
<summary>Reference for API and MCP users: the saved structure</summary>

Each block is stored as an `Action` object:

```json
{
  "type": "respondWithMessage",
  "key": "welcome_reply",
  "enabled": true,
  "depend_on": [],
  "error": { "mode": "stop" },
  "payload": {
    "content": "Hello ((user.username))! Welcome to ((guild.name)).",
    "ephemeral": true
  }
}
```

| Field | Type | Meaning |
|---|---|---|
| `type` | String | The block identifier, one of the types in the [Dictionary](/docs/blocks-dictionary/). |
| `payload` | Object | The values of the block's fields, keyed by the field identifiers listed in the Dictionary. |
| `key` | String | The *Action Key*: names the block's output (`((action.key))`). |
| `enabled` | Boolean | Default `true`. When `false` the block is skipped. |
| `depend_on` | Array of strings | Keys of blocks this one depends on. |
| `error` | Object | The *On Error* policy: `mode` is `stop`, `continue`, `jump` or `skip`. |

</details>

---

## 2. Inputs, Outputs, and Context Variables

### Discord context variables `((...))`
Text fields accept dynamic placeholders resolved at runtime:
- **User**: `((user.id))`, `((user.username))`, `((user.avatar))`
- **Guild / Server**: `((guild.id))`, `((guild.name))`, `((guild.memberCount))`
- **Channel**: `((channel.id))`, `((channel.name))`
- **Slash options**: `((opts.option_name))` (or `((opts.option_name.id))` for IDs)
- **Components**: `((interaction.customId))`, `((interaction.userId))`

### Block outputs `((action.<key>))`
When a block produces an identifier or a result (for example *Create Channel* returns the new channel's ID), give it an **Action Key** in the editor, e.g. `ticket_chan`. Later blocks read it with:

```text
((action.ticket_chan))
```

---

## 3. Step-by-Step: 3 Core Projects

Each project is built from the real blocks; open a block to see its fields.

---

### Project 1: The `/ping` Slash Command

**Goal:** a slash command that replies with the bot's latency in an embed.

<div class="block-flow-canvas my-6">
{% app_entry kind="slash" name="ping" %}
{% include block_connector.html %}
{% app_block example="ping_reply" %}
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

**Goal:** when a new member joins, send a personalised welcome message to your welcome channel. Replace the channel ID with your own.

<div class="block-flow-canvas my-6">
{% app_entry event="guildMemberAdd" %}
{% include block_connector.html %}
{% app_block example="welcome_send" %}
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

### Project 3: Role Assignment When a Button Is Clicked

**Goal:** when a member clicks the button whose custom ID is `verify_member`, give them a role and confirm privately. The panel carrying the button is sent separately with a *Send Message* block and its components editor.

<div class="block-flow-canvas my-6">
{% app_entry event="interactionCreate" custom_id="verify_member" %}
{% include block_connector.html %}
{% app_block example="verify_add_role" %}
{% include block_connector.html %}
{% app_block example="verify_reply" %}
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

- 📖 **[Complete Blocks Dictionary](/docs/blocks-dictionary/)**: all {{ site.data.blocks_registry.blocks | size }} blocks of the app, with their fields, hints and options.
- 🎫 **[Support Ticket System Guide](/docs/tickets/)**: architecture and production deployment of private support channels.
- ⚙️ **[Execution Model & Best Practices](/docs/execution-model/)**: acknowledgment rules, state management and optimisation tips.
