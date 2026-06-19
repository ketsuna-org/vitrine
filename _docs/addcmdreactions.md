---
layout: doc
title: $addCmdReactions
translation_key: docs
category: "Moderation"
function_name: addCmdReactions
syntax: $addCmdReactions[emoji1;emoji2;...]
description: Ajoute une ou plusieurs réactions au message de commande de l'utilisateur (le message qui a déclenché la commande).
parameters:
  - name: emoji1;emoji2;...
    description: Liste des émojis à ajouter, séparés par des points-virgules.
returns:
  - type: aucun
    description: Ne retourne rien. Les réactions sont ajoutées au message déclencheur.
related:
  - $addReactions
  - $addMessageReactions
  - $clearReactions
examples:
  - description: Réagir à une commande
    code: $addCmdReactions[✅]
  - description: Réagir avec plusieurs émojis
    code: $addCmdReactions[👍;❤️]
---

# $addCmdReactions

La fonction `$addCmdReactions[]` permet d'**ajouter des réactions directement au message de l'utilisateur** qui a déclenché la commande.

## Syntaxe

```
$addCmdReactions[emoji1;emoji2;...]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `emoji1;emoji2;...` | Liste d'émojis séparés par `;`. Supporte les émojis Unicode et personnalisés. |

## Valeur de retour

Cette fonction ne retourne pas de valeur. Les réactions sont ajoutées au message de commande.

## Comportement

- Contrairement à `$addReactions[]`, cette fonction cible le message **déclencheur** (message de l'utilisateur).
- Utile pour donner un feedback visuel rapide sans envoyer de message.
- Le bot doit avoir la permission `ADD_REACTIONS` dans le canal.

## Exemples

### Feedback silencieux

```bdfd
$addCmdReactions[✅]
$suppressErrors[Action effectuée.]
```

### Feedback conditionnel

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $addCmdReactions[✅]
  $ban[$mentioned[1]]
$else
  $addCmdReactions[❌]
  $ephemeral[Vous n'avez pas la permission.]
$endif
```

### Indicateur de progression

```bdfd
$addCmdReactions[⏳]
$wait[2]
$removeReaction[$channelID;$messageID;⏳]
$addCmdReactions[✅]
```

## Notes

- `$addCmdReactions[]` ne fonctionne que si le message déclencheur existe encore.
- Ne nécessite pas d'envoyer un message de réponse.
- Idéal pour les commandes rapides où un simple émoji suffit comme confirmation.
