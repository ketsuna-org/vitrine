---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $sendMessage

Sends a message with its content, embeds, and components (buttons, select menus).

## Syntax

```
$sendMessage[content]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `content` | Text content of the message | Yes |

## Description

`$sendMessage` is the main command to send a message in the channel where the command was executed. If embeds (via `$newEmbed`, `$addEmbedField`, etc.) or components (via `$addActionRow`, `$addButtonCV2`, etc.) were constructed before this call, they are automatically included in the message.

The text content can be empty (`$sendMessage[]`) if only embeds or components are sent.

## Examples

### Simple message

```
$sendMessage[Hello world!]
```

### With embeds

```
$newEmbed[title=Announcement;description=This is an important announcement;color=#FF0000]
$sendMessage[]
```

### With buttons

```
$addActionRow
$addButtonCV2[btn_yes;Yes;success]
$addButtonCV2[btn_no;No;danger]
$sendMessage[Do you confirm?]
```

### Complete message

```
$newEmbed[title=Welcome;description=Welcome to the server!;color=#00FF00]
$addActionRow
$addButtonCV2[btn_rules;Rules;primary]
$addButtonCV2[btn_roles;Roles;secondary]
$sendMessage[Welcome $username!]
```

### Response in $onInteraction

```
$onInteraction
$if[$customID==btn_yes]
  $sendMessage[You have confirmed!]
$endif
```

## Notes

- `$sendMessage` sends in the current channel. To send in another channel, use `$sendMessage[content;channelId]` (depending on version) or `$channelSendMessage`.
- The content can be empty if you are only sending embeds/components.
- In `$onInteraction`, the message is sent in response to the interaction.
- Flag functions applicable before `$sendMessage`: `$reply`, `$ephemeral`, `$tts`, `$noMention`, `$allowMention`.
