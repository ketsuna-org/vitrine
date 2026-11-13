---
layout: doc
title: Blocks — Visual No-Code Programming Reference
category: "Blocks"
api_type: blocks
description: How the Bot Creator Blocks editor works. What a block looks like, how its fields behave, and three step-by-step projects built with the real blocks of the app.
permalink: /docs/blocks/
---

The **Blocks** system is Bot Creator's visual editor. A command or an event workflow is a **graph**: each block is a node, and links join the output pins of a node (*next*, *then*, *else*, *body*…) to the nodes that follow. You add blocks in the editor, fill their fields, and the native engine runs the graph in a deterministic order. Every block you see on this site is drawn from the app's own registry of node types, so names, fields, hints and options are the ones you will find in the editor. The graph format itself is described in the [Graph mode guide](/fr/docs/graph/) (French).

Each block is saved as a graph node with a type, a result key and an error policy (see [how a block is saved](#under-the-hood-how-a-block-is-saved)). Older commands written as a list of actions keep working: they are converted to a graph when they are loaded.

---

## 1. Block anatomy

This is a **Send Message** block as it appears in the editor. Tap the header to collapse or expand it, as in the app.

<div class="block-flow-canvas my-6">
{% app_block example="anatomy_send" %}
</div>

From left to right and top to bottom:

- **Icon tile and category.** The tile carries the colour of the block's family; the small uppercase line above the name is the category (here *Messages*). The block itself stays neutral, only the tile and that line are coloured.
- **Name.** The name shown in the palette and in the editor (*Send Message*). The grey line under it is the block's identifier (`sendMessage`), which is what you use with the API and the MCP; the app shows a one-line summary of the values there.
- **Fields.** One control per parameter, in a fixed order. A text field shows its hint until you type; a switch is an on/off option; a drop-down offers a fixed list; a bordered tile with a pencil opens a sub-editor (embeds, components, inline sub-graph…). A red `*` marks a required field.
- **Variables.** Text fields accept `((variables))` such as `((user.username))`; they are highlighted in violet.
- **Action Key.** The name of the block's result, readable later as `((action.<key>))`. Every node has one; the editor gives each new block a free `action_<n>` key.
- **Advanced settings.** Under the fields, every block has **Action Key**, an **Enabled** switch and **On Error**: *Stop* or *Continue*. To react to a failure, link the node's `error` pin to the blocks that should run instead.
- **Menu (⋮).** Copy, Duplicate, Paste, Documentation & guides and Delete.

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

A command is built either with **Visual (Graph)**, with **BDFD Code**, or with **JavaScript**; the blocks described on this page belong to the first mode. A BDFD script can be converted to a graph and back: see [BDFD and Graph](/fr/docs/bdfd-graph/) (French).

### Under the hood: how a block is saved

<details class="block-json-ref">
<summary>Reference for API and MCP users: the saved structure</summary>

Each block is stored as a graph node, and a command or workflow stores its graph in `graph` (`executionMode: "graph"`):

```json
{
  "version": 2,
  "nodes": [
    {
      "id": "n1",
      "type": "respondWithMessage",
      "key": "welcome_reply",
      "enabled": true,
      "payload": {
        "content": "Hello ((user.username))! Welcome to ((guild.name)).",
        "ephemeral": true
      }
    }
  ],
  "links": [{ "from": { "node": "start", "pin": "next" }, "to": "n1" }],
  "data": []
}
```

| Field | Type | Meaning |
|---|---|---|
| `id` | String | Internal, stable identifier (`n1`, `n2`…). Links refer to it. `start` is reserved for the entry. |
| `type` | String | The block identifier, one of the types in the [Dictionary](/docs/blocks-dictionary/). |
| `key` | String | The *Action Key*: names the block's result (`((action.key))`). Required, not empty, not necessarily unique (the last writer wins). |
| `payload` | Object | The values of the block's fields, keyed by the field identifiers listed in the Dictionary. It never contains a nested list of actions. |
| `enabled` | Boolean | Default `true`. When `false` the block produces no result and the flow goes on. |
| `error` | Object | The *On Error* policy: `mode` is `stop` (default) or `continue`. |

Links `{ "from": { "node", "pin" }, "to" }` carry the flow. Pins are `next` (every ordinary block), `then`, `elseif:<i>` and `else` (*IF / ELSE*), `body` and `done` (loops), `try`, `catch` and `done` (*Try / Catch*), `case:<value>` and `default` (*Switch*), and `error` (failure). Several links on one pin start parallel branches, run in the order of the links. Validate a graph with the `validate_graph` tool of the [MCP server](/docs/mcp/).

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
        <svg class="pxicon" aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none"><use href="{{ '/assets/icons/pixelarticons.svg' | relative_url }}#visibility_off"></use></svg>
        <span>Only you can see this • <a href="#" class="underline hover:text-white" onclick="return false;">Dismiss message</a></span>
      </div>
    </div>
  </div>
</div>

---

## Every BDFD function is available as a block

Blocks and BDFD run on the same native engine, so nothing you can write in BDFD is out of reach of the visual editor. Every function of the engine is a block of its own, with its name as title and one field per argument: `$floorDiv`, `$mod`, `$hash`, `$seededRandom`, `$createForumPost`, `$forumTags`, `$setThreadTags`, `$canvasTileGrid`, `$channelMessageCount`, `$listVars`, the atomic variables `$increment`, `$compareAndSetVar`, `$tryLock` and `$unlock`, and every other function of the [BDFD function reference](/docs/). A function that already has a dedicated block (send a message, wait, log...) appears once, under that block.

1. Search the function by its name in the block palette and add it.
2. Fill one field per argument. Fields are named as in the function's documentation and optional arguments are marked. Variables `((...))` work like in any other block.
3. The returned value is stored under the block key: read it in the next blocks with `((action.<key>))`.

Arguments use BDFD syntax, so write `\;` for a literal semicolon and `$name[...]` to nest another function. The list is generated from the engine itself: a function added to Bot Creator shows up as a block without an update of the editor.

---

## 4. Explore All Blocks

- 📖 **[Complete Blocks Dictionary](/docs/blocks-dictionary/)**: all {{ site.data.blocks_registry.blocks | size }} blocks of the app, with their fields, hints and options.
- 🎫 **[Support Ticket System Guide](/docs/tickets/)**: architecture and production deployment of private support channels.
- ⚙️ **[Execution Model & Best Practices](/docs/execution-model/)**: acknowledgment rules, state management and optimisation tips.
