---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $sendMessage

Sends the message with its content, its embeds and its components (buttons, select menus).

## Syntax

```
$sendMessage[content]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `content` | Text content of the message | Yes |

## Description

`$sendMessage` est the command main pour envoyer un message in the channel where the command was executed. If embeds (via `$newEmbed`, `$addEmbedField`, etc.) or des components (via `$addActionRow`, `$addButtonCV2`, etc.) were construits before this call, they are automatically included in the message.

The text content can be vide (`$sendMessage[]`) if only embeds or components are sent.

## Examples

### Message simple

```
$sendMessage[Bonday le monde !]
```

### Avec embeds

```
$newEmbed[title=Annonce;description=Ceci est une annonce importante;color=#FF0000]
$sendMessage[]
```

### Avec buttons

```
$addActionRow
$addButtonCV2[btn_yes;Oui;success]
$addButtonCV2[btn_no;Non;danger]
$sendMessage[Confirmez-vous ?]
```

### Message complete

```
$newEmbed[title=Bienvenue;description=Bienvenue on the server !;color=#00FF00]
$addActionRow
$addButtonCV2[btn_rules;Règlement;primary]
$addButtonCV2[btn_roles;Roles;secondary]
$sendMessage[Bienvenue $username !]
```

### Response dans $onInteraction

```
$onInteraction
$if[$customID==btn_yes]
  $sendMessage[Vous avez confirmé !]
$endif
```

## Notes

- `$sendMessage` sends in the channel courant. Pour envoyer dans un autre channel, utilisez `$sendMessage[content;channelId]` (selon version) or `$channelSendMessage`.
- Le contenu can be vide si vous envoyez only embeds/components.
- Dans `$onInteraction`, the message est sent en response à l'interaction.
- Functions de flag applicables before `$sendMessage` : `$reply`, `$ephemeral`, `$tts`, `$noMention`, `$allowMention`.
