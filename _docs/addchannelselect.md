---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addChannelSelect

Adds a select menu of the server's channels to the response message. The user can choose one or several channels.

## Syntax

```text
$addChannelSelect[customId;(placeholder);(minValues);(maxValues);(disabled);(messageID);(channelTypes)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom ID that identifies the menu when it is used (1 to 100 characters). | Yes |
| `placeholder` | Text displayed when nothing is selected. | No |
| `minValues` | Minimum number of channels to select, integer from 0 to 25 (default: 1, also when empty). | No |
| `maxValues` | Maximum number of channels to select, integer from 1 to 25 (default: 1, also when empty). It must not be lower than `minValues` (`Minimum cannot exceed maximum.`). | No |
| `disabled` | `yes`/`true` to disable the menu, `no`/`false` (default, also when empty) otherwise. Any other value raises `Expected yes or no`. | No |
| `messageID` | ID of an existing message sent by the bot (a positive integer, otherwise `Invalid message ID.`). The menu is added to that message instead of the response being built. | No |
| `channelTypes` | Accepted by the engine but not applied to a menu sent in the response: all channel types are listed. See the note below. | No |

## Description

The selected channel IDs are read, in the script run for the interaction, with `$getChannelSelectChannelID[index]`, `$getChannelSelectChannelIDs[separator;(limit)]` and `$getChannelSelectChannelCount`.

Note the argument order: the 6th argument is `messageID` and the 7th is `channelTypes`.

The menu always gets its own action row, and a message holds at most 5 rows (`A message supports at most 5 component rows.`). Do not write `$addActionRow` before a select menu: the empty row it creates stays in the message and the response fails with `Invalid component row size.`

The menu belongs to the **response message** of the script (the text written in the script and the embed functions), not to a message sent with `$sendMessage[]`.

## Examples

### Channel selection

```bdfd
Select a channel
$addChannelSelect[menu_channel;Choose a channel]
```

### Several channels

```bdfd
Select up to 3 channels
$addChannelSelect[menu_logs;Log channels;1;3]
```

### Disabled menu

```bdfd
This menu is disabled
$addChannelSelect[menu_chan_disabled;Unavailable;1;1;yes]
```

## Handling the interaction

The script run when the menu is used reads the choice and identifies the menu with `$customID`:

```bdfd
$if[$customID==menu_channel]
  Selected channel: <#$getChannelSelectChannelID[1]>
$endif
```

## Notes

- The values are Discord channel IDs; use `<#ID>` to mention a channel.
- `channelTypes`: the engine keeps this value, but a menu sent in the response is built without any channel type filter, so every type of channel is offered. When the menu is added to an existing message with `messageID`, only Discord channel type numbers (for example `0,2`) are sent; names such as `text` or `voice` are ignored. To restrict the menu use `$addCategorySelect` or `$addVoiceSelect`.
- A single select menu per action row.
