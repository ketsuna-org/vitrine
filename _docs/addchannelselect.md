---
layout: doc
translation_key: docs
category: "Components & Interactions"
---

# $addChannelSelect

Creates a select menu of channels. Allows users to choose one or multiple channels on the server.

## Syntax

```
$addChannelSelect[customId;placeholder;(minValues);(maxValues);(disabled);(channelTypes)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when nothing is selected | Yes |
| `minValues` | Minimum number of channels to select (default: 1) | No |
| `maxValues` | Maximum number of channels to select (default: 1) | No |
| `disabled` | `true` to disable the menu, `false` (default) | No |
| `channelTypes` | Types of channels displayed, separated by commas | No |

## Channel types (channelTypes)

| Type | Description |
|------|-------------|
| `text` | Text channels |
| `voice` | Voice channels |
| `category` | Categories |
| `news` | Announcement channels |
| `stage` | Stage channels |
| `forum` | Forums |
| `thread` | Thread channels |

By default, all types are displayed.

## Examples

### Channel selection

```
$addChannelSelect[menu_channel;Choose a channel]
$sendMessage[Select a channel]
```

### Text channel only

```
$addChannelSelect[menu_text;Text channel;1;1;false;text]
$sendMessage[Choose a text channel]
```

### Voice and stage channels

```
$addChannelSelect[menu_vocal;Voice channel;1;3;false;voice,stage]
$sendMessage[Select voice channels]
```

### Disabled menu

```
$addChannelSelect[menu_chan_disabled;Unavailable;1;1;true]
$sendMessage[This menu is disabled]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_channel]
  $sendMessage[Selected channel: <#$message>]
$endif
```

## Notes

- The returned values are Discord channel IDs.
- Use `<#ID>` to mention a channel.
- The `channelTypes` parameter allows filtering precisely which channels are displayed.
- Useful for configuration, logs, or redirection commands.

