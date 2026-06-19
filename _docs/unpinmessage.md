---
layout: doc
title: $unpinMessage
translation_key: docs
category: "Moderation"
function_name: unpinMessage
syntax: $unpinMessage[messageID]
description: Retire un message épinglé de la liste des messages épinglés du canal.
parameters:
  - name: messageID
    description: L'ID du message à désépingler.
returns:
  - type: aucun
    description: Ne retourne rien. Le message est désépinglé.
related:
  - $pinMessage
  - $channelSendMessage
examples:
  - description: Désépingler un message
    code: $unpinMessage[123456789]
  - description: Désépingler le message courant
    code: $unpinMessage[$messageID]
---

# $unpinMessage

La fonction `$unpinMessage[]` permet de **retirer un message de la liste des messages épinglés** d'un canal.

## Syntaxe

```
$unpinMessage[messageID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `messageID` | L'ID du message à désépingler. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Le bot doit avoir la permission `MANAGE_MESSAGES`.
- Le message n'est pas supprimé, seulement retiré des épingles.
- Si le message n'est pas épinglé, rien ne se passe.

## Exemples

### Désépingler après action

```bdfd
$unpinMessage[$noMentionMessage]
$sendMessage[Message désépinglé.]
```

### Nettoyage automatique

```bdfd
$unpinMessage[$messageID]
$editMessage[Ce message n'est plus d'actualité.]
```

### Rotation d'annonces

```bdfd
$unpinMessage[$oldAnnouncementID]
$title[Nouvelle annonce]
$description[$noMentionMessage]
$sendMessage[]
$pinMessage[$messageID]
```

## Notes

- Les utilisateurs ne sont pas notifiés lorsqu'un message est désépinglé.
- Un message peut être ré-épinglé après avoir été désépinglé.
- Combinez avec `$pinMessage[]` pour gérer les annonces tournantes.
