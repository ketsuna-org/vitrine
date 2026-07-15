---
layout: doc
title: interaction
category: "JavaScript API"
api_type: javascript
sidebar_context: javascript
description: Slash command and component interaction object in BDJS scripts.
permalink: /docs/javascript/interaction/
---

The `interaction` global is available when a command runs from a slash command or component interaction.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `commandName` | `string` | Name of the slash command |
| `customId` | `string` | Component custom ID (buttons, selects, modals) |
| `user` | `object` | User who triggered the interaction |
| `member` | `object` | Guild member (in servers) |
| `guild` | `object` | Guild object |
| `channel` | `object` | Channel object |

## Methods

### `await interaction.reply(content)`

Reply to the interaction. `content` can be a string or `{ content, ephemeral?, embeds?, components? }`.

```javascript
await interaction.reply('Hello!');
await interaction.reply({ content: 'Only you see this', ephemeral: true });
```

### `await interaction.editReply(content)`

Edit the initial reply (after `deferReply` or first reply).

### `await interaction.deferReply(options?)`

Acknowledge the interaction; follow up with `editReply` or `followUp`.

```javascript
await interaction.deferReply();
await interaction.editReply('Done!');
```

### `await interaction.followUp(content)`

Send an additional message in the interaction thread.

### `await interaction.deleteReply()`

Delete the initial reply.

### `await interaction.fetchReply()`

Fetch the reply message object.

## interaction.options

| Method | Description |
|--------|-------------|
| `getString(name, required?)` | String option |
| `getInteger(name, required?)` | Integer option |
| `getNumber(name, required?)` | Number option |
| `getBoolean(name, required?)` | Boolean option |
| `getUser(name)` | User option |
| `getMember(name)` | Guild member option |
| `getChannel(name)` | Channel option |
| `getRole(name)` | Role option |
| `getAttachment(name)` | Attachment option |
| `getMentionable(name)` | User or role option |
| `getSubcommand(required?)` | Active subcommand name |
| `getSubcommandGroup(required?)` | Active subcommand group |
| `getFocused(required?)` | Autocomplete typed value |

```javascript
const name = interaction.options.getString('name', true);
const target = interaction.options.getUser('target');
await interaction.reply(`Hello, ${name}!`);
```

## Related

- [Components](/docs/javascript/components/) — buttons, selects, modals
- [Autocomplete](/docs/javascript/autocomplete/) — dynamic slash suggestions
