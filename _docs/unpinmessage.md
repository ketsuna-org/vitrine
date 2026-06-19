---
layout: doc
title: $unpinMessage
translation_key: docs
category: "Moderation"
function_name: unpinMessage
syntax: $unpinMessage[messageID]
description: Retire un message épinglé de la list des messages épinglés du canal.
---

# $unpinMessage

The function `$unpinMessage[]` allows **retirer un message de la list des messages épinglés** d'un canal.

## Syntax

```
$unpinMessage[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message à désépingler. |

## Return Value

This function ne retourne pas de value.

## Behavior

- The bot doit avoir la permission `MANAGE_MESSAGES`.
- The message is not deleted, only retiré des épingles.
- Si the message is not épinglé, rien ne se passe.

## Examples

### Désépingler after action

```bdfd
$unpinMessage[$noMentionMessage]
$sendMessage[Message désépinglé.]
```

### Nettoyage automatique

```bdfd
$unpinMessage[$messageID]
$editMessage[This message n'est plus d'actualité.]
```

### Rotation d'annonces

```bdfd
$unpinMessage[$oldAnnouncementID]
$title[New annonce]
$description[$noMentionMessage]
$sendMessage[]
$pinMessage[$messageID]
```

## Notes

- Les users are not notifiés when a message est désépinglé.
- Un message can be ré-épinglé after avoir été désépinglé.
- Combinez avec `$pinMessage[]` pour gérer les annonces tournantes.
