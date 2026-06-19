---
layout: doc
title: $removeReaction
translation_key: docs
category: "Moderation"
function_name: removeReaction
syntax: $removeReaction[channelID;messageID;emoji]
description: Supprime une réaction spécifique (émoji) d'un message donné. Utile pour retirer des réactions de contrôle après action.
---

# $removeReaction

La fonction `$removeReaction[]` permet de **supprimer une réaction spécifique** d'un message.

## Syntaxe

```
$removeReaction[channelID;messageID;emoji]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du canal contenant le message. |
| `messageID` | L'ID du message cible. |
| `emoji` | L'émoji à retirer (Unicode ou personnalisé `<:nom:ID>`). |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Supprime UNIQUEMENT la réaction du bot.
- Pour supprimer les réactions d'autres utilisateurs, la permission `MANAGE_MESSAGES` est nécessaire.
- Si l'émoji n'est pas présent en réaction, rien ne se passe.

## Exemples

### Indicateur de progression

```bdfd
$addCmdReactions[⏳]
$wait[3]
$removeReaction[$channelID;$messageID;⏳]
$addCmdReactions[✅]
```

### Nettoyage sélectif

```bdfd
$removeReaction[$channelID;$messageID;❌]
$addMessageReactions[$channelID;$messageID;✅]
$editMessage[Action confirmée.]
```

### Système de confirmation

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $removeReaction[$channelID;$messageID;⏳]
  $addMessageReactions[$channelID;$messageID;✅]
$else
  $removeReaction[$channelID;$messageID;⏳]
  $addMessageReactions[$channelID;$messageID;❌]
$endif
```

## Notes

- Pour supprimer toutes les réactions d'un coup, utilisez `$clearReactions[]`.
- L'émoji doit être exactement le même que celui utilisé pour la réaction.
- Les émojis personnalisés doivent être au format `<:nom:ID>`.
