---
layout: doc
title: $unBanID
translation_key: docs
category: "Moderation"
function_name: unBanID
syntax: $unBanID[userID]
description: Débannit un utilisateur du serveur en utilisant uniquement son ID. Fonctionne de manière similaire à $unBan mais optimisé pour les IDs bruts.
parameters:
  - name: userID
    description: L'ID Discord de l'utilisateur à débannir.
returns:
  - type: string
    description: Chaîne vide en cas de succès, ou message d'erreur en cas d'échec.
related:
  - $unBan
  - $ban
  - $isBanned
examples:
  - description: Débannir un utilisateur par ID
    code: $unBanID[123456789012345678]
---

# $unBanID

La fonction `$unBanID[]` permet de **débannir un utilisateur par son ID**. Similaire à `$unBan[]`, elle est optimisée pour les cas où seul l'ID brut est disponible.

## Syntaxe

```
$unBanID[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID Discord de l'utilisateur à débannir. |

## Valeur de retour

- **Type** : String (vide en cas de succès)
- Chaîne vide si le débannissement réussit.
- Message d'erreur si échec (utilisateur non banni, permissions insuffisantes, etc.).

## Comportement

- Fonctionne de manière identique à `$unBan[]`.
- Le bot doit avoir la permission `BAN_MEMBERS`.
- Accepte uniquement un ID brut (pas de mention).

## Exemples

### Débannissement depuis une liste

```bdfd
$let[bans;$getBanList[, ]]
$textSplit[$bans;, ]
  $let[userID;$splitText[$index]]
  $if[$checkCondition[$userID==$mentioned[1]]==true]
    $unBanID[$userID]
    ✅ **$userName[$userID]** a été débanni.
    $break
  $endif
$endTextSplit
```

### Débannissement programmé

```bdfd
$let[target;$noMentionMessage]
$if[$isBanned[$target]==true]
  $unBanID[$target]
  $title[🔓 Débannissement automatique]
  $description[
  L'utilisateur **$target** a été débanni (fin de la durée de bannissement).
  ]
  $color[#57F287]
  $sendMessage[$channelID[mod-logs]]
$endif
```

## Notes

- `$unBanID[]` est interchangeable avec `$unBan[]` pour les IDs bruts.
- La différence est minime ; préférez `$unBan[]` qui gère aussi les mentions.
- Utile pour les scripts internes où seul l'ID est connu.
