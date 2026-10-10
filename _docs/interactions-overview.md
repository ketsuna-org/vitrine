---
layout: doc
title: Interactions Overview
category: "Meta"
api_type: general
description: Buttons, select menus, modals, and slash commands — how Bot Creator handles rich Discord interactions.
permalink: /docs/interactions-overview/
---

Rich interactions let users tap buttons, pick from dropdowns, or fill modals instead of typing long command arguments. Bot Creator resolves these through the `interactionCreate` event.

## Interaction types

| `((interaction.kind))` | Trigger |
|------------------------|---------|
| `command` | Slash command or context menu |
| `button` | Button click |
| `select` | Select menu choice |
| `modal` | Modal form submission |
| `autocomplete` | Slash option autocomplete |

## Core variables

Every interaction exposes:

| Variable | Description |
|----------|-------------|
| `((interaction.customId))` | Developer-defined ID on the component |
| `((interaction.userId))` | User who triggered the interaction |
| `((interaction.channelId))` | Channel ID |
| `((interaction.guildId))` | Server ID (empty in DMs) |
| `((interaction.messageId))` | Message holding the component |
| `((opts.<name>))` | Slash command option value (for user, channel, role and mentionable options the ID is `((opts.<name>.id))`) |

## Responding to an interaction

Unlike standard messages, an interaction expects an acknowledgment or response within 3 seconds.

### In BDScript (BDFD)
Emitting text or embed content automatically sends the interaction reply. Use `$ephemeral` to make it visible only to the interacting user. Do not append `$sendMessage` in slash commands unless you need a separate message in the channel. Inside a BDFD script, read the component ID with `$customID` (it is an error outside a component or modal interaction): `((...))` text is not resolved in BDFD scripts.

```bdfd
$if[$customID==btn_verify]
  $ephemeral
  Verified! Your account has been unlocked.
$endif
```

### In Blocks
Use the dedicated `respondWithMessage` action with the `ephemeral` checkbox:

```json
{
  "type": "respondWithMessage",
  "payload": {
    "content": "Verified! Your account has been unlocked.",
    "ephemeral": true
  }
}
```

### In JavaScript (BDJS)
In BDJS scripts, use the global `interaction` object:

```javascript
if (interaction.isButton()) {
  await interaction.reply({ content: 'Clicked!', ephemeral: true });
}
```

See [Components](/docs/javascript/components/) and [interaction](/docs/javascript/interaction/).

## 3. Read select values

| Select type | Getter |
|-------------|--------|
| String select | [$getStringSelectValue](/docs/getstringselectvalue/) |
| User select | [$getUserSelectUserId](/docs/getuserselectuserid/) |
| Role select | [$getRoleSelectRoleId](/docs/getroleselectroleid/) |
| Channel select | [$getChannelSelectChannelId](/docs/getchannelselectchannelid/) |

## Slash commands

Slash commands are interactions too. Read an option with `$message[name]` in BDScript (for a slash command it returns the option value), with `((opts.<name>))` in Blocks placeholders, or `interaction.options.getString('name')` in JavaScript.

The runner acknowledges a BDFD script before running it, except when the script source contains `$newModal`, `$callWorkflow`, `$eval` or `$funcCall` (see the [execution model](/docs/execution-model/)). See also [$defer](/docs/defer/) and the `deferInteraction` block.

## Guides

| Guide | Topics |
|-------|--------|
| [Handling rich interactions](/building-commands/2026/05/23/handling-rich-interactions-in-bot-creator-buttons-select-menus-modals/) | Buttons, selects, modals, autocomplete |
| [Building interactive buttons and select menus](/building-commands/2026/05/30/building-interactive-buttons-and-select-menus-in-bdfd/) | Role assignment patterns |

## Function reference

Browse the [Components & Interactions](/docs/#components-interactions) category for all builder and getter functions.
