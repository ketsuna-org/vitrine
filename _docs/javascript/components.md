---
layout: doc
title: Components
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Handle button, select menu, and modal interactions in BDJS scripts.
permalink: /docs/javascript/components/
---

Component interactions (buttons, select menus, modals) expose the same `interaction` global as slash commands, with additional type guards and properties.

## Type guards

| Method | Returns `true` when |
|--------|---------------------|
| `interaction.isButton()` | Button click |
| `interaction.isStringSelectMenu()` | String select menu |
| `interaction.isUserSelectMenu()` | User select menu |
| `interaction.isChannelSelectMenu()` | Channel select menu |
| `interaction.isRoleSelectMenu()` | Role select menu |
| `interaction.isMentionableSelectMenu()` | Mentionable select menu |
| `interaction.isModalSubmit()` | Modal form submitted |
| `interaction.isAutocomplete()` | Autocomplete request |
| `interaction.isChatInputCommand()` | Slash command |

```javascript
if (interaction.isButton()) {
  if (interaction.customId === 'verify') {
    await interaction.reply({ content: 'Verified!', ephemeral: true });
  }
}
```

## Common properties

| Property | Description |
|----------|-------------|
| `customId` | Developer-defined component ID |
| `user` | User who triggered the interaction |
| `member` | Guild member (in servers) |
| `guild` | Guild object |
| `channel` | Channel object |
| `id` | Interaction snowflake |
| `guildId` | Guild ID string |
| `channelId` | Channel ID string |
| `deferred` | Whether deferReply was called |
| `replied` | Whether a reply was sent |
| `ephemeral` | Whether the reply is ephemeral |

## Select menu values

String select menus expose `values` — an array of selected option values:

```javascript
if (interaction.isStringSelectMenu()) {
  const choice = interaction.values[0];
  await interaction.reply(`You picked: ${choice}`);
}
```

## Building components

Create buttons, selects, and modals with [discord.js builders](/docs/javascript/discordjs-builders/):

```javascript
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('ping')
    .setLabel('Ping')
    .setStyle(ButtonStyle.Primary),
);

await interaction.reply({ content: 'Click a button:', components: [row] });
```

## Modals

Show a modal from a button handler:

```javascript
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const modal = new ModalBuilder()
  .setCustomId('profile_modal')
  .setTitle('Edit profile');

const input = new TextInputBuilder()
  .setCustomId('name')
  .setLabel('Display name')
  .setStyle(TextInputStyle.Short);

modal.addComponents(new ActionRowBuilder().addComponents(input));
await interaction.showModal(modal);
```

Read submitted fields in a modal handler:

```javascript
if (interaction.isModalSubmit()) {
  const name = interaction.fields.getTextInputValue('name');
  await interaction.reply(`Updated name: ${name}`);
}
```

## Related

- [interaction](/docs/javascript/interaction/) — reply, defer, followUp
- [Autocomplete](/docs/javascript/autocomplete/) — dynamic slash suggestions
- [Interactions overview](/docs/interactions-overview/) — BDScript component workflow
