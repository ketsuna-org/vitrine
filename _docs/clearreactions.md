---
layout: doc
title: $clearReactions
translation_key: docs
category: "Moderation"
function_name: clearReactions
syntax: $clearReactions[messageID]
description: Supprime all réactions of a message spécifique. Ne can be utilisé que to delete les réactions ajoutées par the bot lui-même in the plupart des cas.
---

# $clearReactions

The `$clearReactions[]` function **supprimer all réactions** of a message en a single opération.

## Syntax

```
$clearReactions[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message dont on souhaite supprimer all réactions. |

## Return value

Cette function does not return a value.

## Behavior

- Supprime TOUTES les réactions of the message, y compris celles d'autres users if the bot a the permission `MANAGE_MESSAGES`.
- If the bot does not have `MANAGE_MESSAGES`, seules les réactions of the bot can be deletedes.
- Utile pour réinitialiser un système de réaction (sondage, giveaway, etc.).

## Examples

### Réinitialiser un sondage

```bdfd
$clearReactions[$messageID]
$addMessageReactions[$channelID;$messageID;👍;👎;🤷]
$sendMessage[Les votes have been réinitialisés.]
```

### Nettoyage automatique

```bdfd
$clearReactions[$messageID]
$addReactions[✅]
$editMessage[Terminé !]
```

### Suppression after fermeture

```bdfd
$clearReactions[$messageID]
$sendMessage[Ce sondage est now fermé.]
```

## Notes

- `$clearReactions[]` supprime all réactions, pas only celles of the bot.
- Requires the permission `MANAGE_MESSAGES` to delete les réactions d'autres users.
- Pour supprimer une réaction spécifique, use `$removeReaction[]`.
