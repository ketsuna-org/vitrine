---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addChannelSelect

Creates a select menu of channels. Allows users to choisir un or multipthe channels of the server.

## Syntax

```
$addChannelSelect[customId;placeholder;(minValues);(maxValues);(disabled);(channelTypes)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when rien n'est selectionné | Yes |
| `minValues` | Minimum number of channels to selectionner (default: 1) | No |
| `maxValues` | Maximum number of channels to selectionner (default: 1) | No |
| `disabled` | `true` to disable le menu, `false` (default) | No |
| `channelTypes` | Types of channels displayeds, separated by commas | No |

## Channel types (channelTypes)

| Type | Description |
|------|-------------|
| `text` | Channels textuels |
| `voice` | Channels vocaux |
| `category` | Catégories |
| `news` | Channels of annonces |
| `stage` | Channels of scène |
| `forum` | Forums |
| `thread` | Fils of discussion |

Par default, all types are displayed.

## Examples

### Selection of channel

```
$addChannelSelect[menu_channel;Choisissez a channel]
$sendMessage[Selectionnez a channel]
```

### Channel textuel only

```
$addChannelSelect[menu_text;Channel textuel;1;1;false;text]
$sendMessage[Choisissez a channel textuel]
```

### Voice and stage channels

```
$addChannelSelect[menu_vocal;Channel vocal;1;3;false;voice,stage]
$sendMessage[Selectionnez of channels vocaux]
```

### Disabled menu

```
$addChannelSelect[menu_chan_disabled;Inavailable;1;1;true]
$sendMessage[Ce menu is disabled]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_channel]
  $sendMessage[Channel selectionné : <#$message>]
$endif
```

## Notes

- Les values retournées sont of IDs of channels Discord.
- Use `<#ID>` to mention a channel.
- Le parameter `channelTypes` allows filtering precisely les channels displayeds.
- Pratique for commands of configuration, logs, or redirections.
