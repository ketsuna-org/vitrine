---
layout: doc
title: discord.js builders
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Allowed discord.js builder exports for embeds, buttons, selects, and modals in sandbox scripts.
permalink: /docs/javascript/discordjs-builders/
---

Import builders via `require('discord.js')`. Only **builder classes and constants** are allowed — not `Client`, `REST`, or `WebhookClient`.

## Allowed builders

| Export | Use |
|--------|-----|
| `EmbedBuilder` | Rich embed messages |
| `AttachmentBuilder` | File attachments |
| `ActionRowBuilder` | Component row container |
| `ButtonBuilder` | Interactive buttons |
| `StringSelectMenuBuilder` | Text dropdown |
| `UserSelectMenuBuilder` | User picker |
| `ChannelSelectMenuBuilder` | Channel picker |
| `RoleSelectMenuBuilder` | Role picker |
| `MentionableSelectMenuBuilder` | User or role picker |
| `ModalBuilder` | Popup forms |
| `TextInputBuilder` | Modal text fields |
| `SlashCommandBuilder` | Slash command definitions |
| `ContextMenuCommandBuilder` | Context menu definitions |

## Constants

`ChannelType`, `ButtonStyle`, `ComponentType`, `TextInputStyle`, `PermissionFlagsBits`, `ActivityType`

## Embed example

```javascript
const { EmbedBuilder } = require('discord.js');

const embed = new EmbedBuilder()
  .setTitle('Stats')
  .setColor(0x5865f2)
  .addFields({ name: 'Coins', value: '100', inline: true });

await interaction.reply({ embeds: [embed] });
```

## Button row example

```javascript
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setCustomId('yes')
    .setLabel('Yes')
    .setStyle(ButtonStyle.Success),
  new ButtonBuilder()
    .setCustomId('no')
    .setLabel('No')
    .setStyle(ButtonStyle.Danger),
);

await interaction.reply({ content: 'Confirm?', components: [row] });
```

## Blocked exports

These throw at runtime:

- `Client` — use the global `client` object instead
- `ShardingManager`
- `WebhookClient`
- `REST`

## Related

- [Components](/docs/javascript/components/) — handling button/select/modal callbacks
- [require()](/docs/javascript/require/) — all allowed modules
