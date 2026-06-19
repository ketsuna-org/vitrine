---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $deleteMessage

Deletes a message specific. The bot must have the permission of gérer les messages in the channel.

## Syntax

```
$deleteMessage[messageId]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `messageId` | ID of the message to delete | Yes |

## Description

`$deleteMessage` supprime permanently a message Discord. The bot must disposer of the permission `MANAGE_MESSAGES` to delete les messages of autres users. Il peut toudays supprimer their propres messages.

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

### Suppression in a interaction

```
$onInteraction
$if[$customID==btn_delete]
  $deleteMessage[$messageID]
  $sendMessage[Message deleted][ephemeral]
$endif
```

### Suppression of a message specific

```
$deleteMessage[123456789012345678]
```

## Notes

- Le parameter `messageId` is required.
- The bot must have `MANAGE_MESSAGES` to delete les messages autres.
- Les messages deleteds cannot être récupérés.
- Pour supprimer the user's message qui a executed la command, use `$messageID`.
- Après suppression, it is courant of envoyer a confirmation éphémère.
