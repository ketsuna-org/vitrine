---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $deleteMessage

Deletes a message spécifique. The bot must have the permission de gérer les messages in the channel.

## Syntax

```
$deleteMessage[messageId]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `messageId` | ID of the message to delete | Yes |

## Description

`$deleteMessage` supprime permanently a message Discord. The bot must disposer de the permission `MANAGE_MESSAGES` to delete les messages d'autres users. Il peut toudays supprimer their propres messages.

## Examples

### Suppression of the message déclencheur

```
$deleteMessage[$messageID]
Command executede discrètement.
```

### Suppression after action

```
$sendMessage[Traitement in progress...]
$wait[3s]
$deleteMessage[$sentMessageId]
$sendMessage[Traitement terminé !]
```

### Suppression dans une interaction

```
$onInteraction
$if[$customID==btn_delete]
  $deleteMessage[$messageID]
  $sendMessage[Message deleted][ephemeral]
$endif
```

### Suppression of a message spécifique

```
$deleteMessage[123456789012345678]
```

## Notes

- Le parameter `messageId` is required.
- The bot must have `MANAGE_MESSAGES` to delete les messages des autres.
- Les messages deleteds cannot être récupérés.
- Pour supprimer the message of the user qui a executed la command, use `$messageID`.
- Après suppression, it is courant d'envoyer a confirmation éphémère.
