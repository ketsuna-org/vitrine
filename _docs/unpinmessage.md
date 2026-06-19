---
layout: doc
title: $unpinMessage
translation_key: docs
category: "Moderation"
function_name: unpinMessage
syntax: $unpinMessage[messageID]
description: Retire un message épinglé of la list messages épinglés of the canal.
---

# $unpinMessage

The function `$unpinMessage[]` allows **retirer un message of la list messages épinglés** of un canal.

## Syntax

```
$unpinMessage[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message to désépingler. |

## Return Value

This function ne retourne pas of value.

## Behavior

- The bot doit avoir la permission `MANAGE_MESSAGES`.
- The message is not deleted, only retiré épingles.
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
$editMessage[This message n'est plus of actualité.]
```

### Rotation of annonces

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
- Combinez with `$pinMessage[]` pour gérer les annonces tournantes.
