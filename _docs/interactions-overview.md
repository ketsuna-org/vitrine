---
layout: doc
title: Interactions Overview
category: "Meta"
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

## BDScript workflow

### 1. Build the UI

Use component builders to attach elements to a message:

- [$addButton](/docs/addbutton/) / [$addButtonCV2](/docs/addbuttoncv2/)
- [$addStringSelect](/docs/addstringselect/)
- [$newModal](/docs/newmodal/)

### 2. Handle the callback

Route by `((interaction.customId))` in an event workflow:

```bdfd
$if[((interaction.customId))==btn_verify]
  $sendResponse[Verified! // ephemeral]
$endif
```

See [$sendResponse](/docs/sendresponse/) for direct interaction replies.

### 3. Read select values

| Select type | Getter |
|-------------|--------|
| String select | [$getStringSelectValue](/docs/getstringselectvalue/) |
| User select | [$getUserSelectUserId](/docs/getuserselectuserid/) |
| Role select | [$getRoleSelectRoleId](/docs/getroleselectroleid/) |
| Channel select | [$getChannelSelectChannelId](/docs/getchannelselectchannelid/) |

## JavaScript workflow

In BDJS scripts, use the global `interaction` object:

```javascript
if (interaction.isButton()) {
  await interaction.reply({ content: 'Clicked!', ephemeral: true });
}
```

See [Components](/docs/javascript/components/) and [interaction](/docs/javascript/interaction/).

## Slash commands

Slash commands are interactions too. Read options with [$slashOption](/docs/slashoption/) in BDScript or `interaction.options.getString()` in JavaScript.

For slow commands, call [$defer](/docs/defer/) first to avoid Discord's 3-second timeout.

## Guides

| Guide | Topics |
|-------|--------|
| [Handling rich interactions](/building-commands/2026/05/23/handling-rich-interactions-in-bot-creator-buttons-select-menus-modals/) | Buttons, selects, modals, autocomplete |
| [Building interactive buttons and select menus](/building-commands/2026/05/30/building-interactive-buttons-and-select-menus-in-bdfd/) | Role assignment patterns |

## Function reference

Browse the [Components & Interactions](/docs/#components-interactions) category for all builder and getter functions.
