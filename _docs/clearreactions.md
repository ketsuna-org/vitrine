---
layout: doc
title: $clearReactions
translation_key: docs
category: "Moderation"
function_name: clearReactions
syntax: $clearReactions[messageID]
description: Supprime toutes les réactions d'un message spécifique. Ne peut être utilisé que pour supprimer les réactions ajoutées par le bot lui-même dans la plupart des cas.
---

# $clearReactions

La fonction `$clearReactions[]` permet de **supprimer toutes les réactions** d'un message en une seule opération.

## Syntaxe

```
$clearReactions[messageID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `messageID` | L'ID du message dont on souhaite supprimer toutes les réactions. |

## Valeur de retour

Cette fonction ne retourne pas de valeur.

## Comportement

- Supprime TOUTES les réactions du message, y compris celles d'autres utilisateurs si le bot a la permission `MANAGE_MESSAGES`.
- Si le bot n'a pas `MANAGE_MESSAGES`, seules les réactions du bot peuvent être supprimées.
- Utile pour réinitialiser un système de réaction (sondage, giveaway, etc.).

## Exemples

### Réinitialiser un sondage

```bdfd
$clearReactions[$messageID]
$addMessageReactions[$channelID;$messageID;👍;👎;🤷]
$sendMessage[Les votes ont été réinitialisés.]
```

### Nettoyage automatique

```bdfd
$clearReactions[$messageID]
$addReactions[✅]
$editMessage[Terminé !]
```

### Suppression après fermeture

```bdfd
$clearReactions[$messageID]
$sendMessage[Ce sondage est maintenant fermé.]
```

## Notes

- `$clearReactions[]` supprime toutes les réactions, pas seulement celles du bot.
- Nécessite la permission `MANAGE_MESSAGES` pour supprimer les réactions d'autres utilisateurs.
- Pour supprimer une réaction spécifique, utilisez `$removeReaction[]`.
