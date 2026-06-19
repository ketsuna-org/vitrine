---
layout: doc
title: $addMessageReactions
translation_key: docs
category: "Moderation"
function_name: addMessageReactions
syntax: $addMessageReactions[channelID;messageID;emoji1;...]
description: Ajoute une ou plusieurs réactions à un message spécifique identifié par son ID de canal et de message.
parameters:
  - name: channelID
    description: L'ID du canal où se trouve le message.
  - name: messageID
    description: L'ID du message auquel ajouter les réactions.
  - name: emoji1;emoji2;...
    description: Liste des émojis à ajouter, séparés par des points-virgules.
returns:
  - type: aucun
    description: Ne retourne rien. Les réactions sont ajoutées au message ciblé.
related:
  - $addReactions
  - $addCmdReactions
  - $clearReactions
  - $removeReaction
examples:
  - description: Ajouter à un message spécifique
    code: $addMessageReactions[$channelID;123456789;👍]
  - description: Ajouter à un message stocké
    code: $addMessageReactions[$channelID;$messageID;✅;🔥]
---

# $addMessageReactions

La fonction `$addMessageReactions[]` permet d'**ajouter des réactions à n'importe quel message** dans le serveur, identifié par son canal et son ID.

## Syntaxe

```
$addMessageReactions[channelID;messageID;emoji1;emoji2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal contenant le message cible. |
| `messageID` | L'ID du message sur lequel ajouter les réactions. |
| `emoji1;emoji2;...` | Liste d'émojis à ajouter, séparés par `;`. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Permet de réagir à des messages anciens ou dans d'autres canaux.
- Le bot doit avoir accès au canal et la permission `ADD_REACTIONS`.
- Le message doit exister et ne pas avoir été supprimé.

## Exemples

### Réagir à un message de rules

```bdfd
$addMessageReactions[$rulesChannelID;123456789012345678;✅]
```

### Réaction à un message stocké

```bdfd
$let[msgID;$getUserVar[lastMessageID]]
$let[chanID;$getUserVar[lastChannelID]]
$addMessageReactions[$chanID;$msgID;👍;👎]
```

### Réagir à un message de giveaway

```bdfd
$addMessageReactions[$giveawayChannel;123456789;🎉]
$sendMessage[Réagissez avec 🎉 pour participer !]
```

## Notes

- `$addMessageReactions[]` est la fonction la plus flexible pour les réactions car elle cible n'importe quel message.
- Pour le message de réponse du bot, préférez `$addReactions[]`.
- Pour le message déclencheur, utilisez `$addCmdReactions[]`.
