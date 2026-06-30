---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addVoiceSelect

Creates a select menu of voice channels. Allows users to choose one or multiple voice channels on the server.

## Syntax

```
$addVoiceSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when nothing is selected | Yes |
| `minValues` | Minimum number of voice channels to select (default: 1) | No |
| `maxValues` | Maximum number of voice channels to select (default: 1) | No |
| `disabled` | `true` to disable the menu, `false` by default | No |

## Description

`$addVoiceSelect` adds a **voice channel select menu** to a message. This component is similar to `$addChannelSelect` but is restricted to **voice channels** only. The user can select one or multiple voice channels, and the interaction returns the selected channel IDs.

This function must be placed after `$addActionRow` to be organized on a specific row.

## Examples

### Voice channel selection

```
$addActionRow
$addVoiceSelect[menu_voice;Choose a voice channel]
$sendMessage[Select a voice channel]
```

### Multiple voice channels

```
$addActionRow
$addVoiceSelect[menu_voices;Voice channels;1;10]
$sendMessage[Select up to 10 voice channels]
```

### Disabled menu

```
$addActionRow
$addVoiceSelect[menu_voice_disabled;Unavailable;1;1;true]
$sendMessage[This menu is disabled]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_voice]
  $sendMessage[Selected voice channel: <#$message>]
$endif
```

## Notes

- The returned values are Discord voice channel IDs.
- Use `<#ID>` to mention a voice channel.
- Only **voice channels** appear in the menu (no text channels, categories, etc.).
- An action row can contain only **one** select menu.
