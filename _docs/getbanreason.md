---
layout: doc
title: $getBanReason
translation_key: docs
category: "Moderation"
function_name: getBanReason
syntax: $getBanReason[userID]
description: Récupère la raison de bannissement d'un utilisateur banni sur le serveur. Retourne la raison stockée dans la liste des bannissements du serveur.
parameters:
  - name: userID
    description: L'ID de l'utilisateur banni dont on souhaite connaître la raison.
returns:
  - type: string
    description: La raison du bannissement, ou chaîne vide si l'utilisateur n'est pas banni ou si aucune raison n'a été fournie.
related:
  - $ban
  - $unban
  - $isBanned
examples:
  - description: Vérifier la raison d'un ban
    code: $getBanReason[$mentioned[1]]
  - description: Vérifier par ID
    code: $getBanReason[123456789]
---

# $getBanReason

La fonction `$getBanReason[]` permet de **récupérer la raison de bannissement** d'un utilisateur banni sur le serveur courant.

## Syntaxe

```
$getBanReason[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur banni. |

## Valeur de retour

- **Type** : String
- La raison du bannissement telle qu'enregistrée par Discord.
- Chaîne vide si l'utilisateur n'est pas banni ou si aucune raison n'a été spécifiée.

## Comportement

- Le bot doit avoir la permission `BAN_MEMBERS` pour voir les raisons de bannissement.
- La raison retournée est celle fournie lors du bannissement (via `$ban[userID;raison]`).
- Si l'utilisateur n'est pas banni, retourne une chaîne vide.

## Exemples

### Vérification de ban

```bdfd
$let[reason;$getBanReason[$mentioned[1]]]
$if[$reason!=]
  $title[🔨 Utilisateur banni]
  $description[
  **Utilisateur :** $userName[$mentioned[1]]
  **ID :** $mentioned[1]
  **Raison :** $reason
  ]
  $color[#ED4245]
  $sendMessage[]
$else
  $sendMessage[Cet utilisateur n'est pas banni.]
$endif
```

### Log de ban

```bdfd
$let[reason;$getBanReason[$userID]]
$title[📋 Détails du bannissement]
$description[
**Utilisateur :** $userName[$userID] ($userID)
**Raison du ban :** $reason
**Vérifié le :** $date[$day]/$date[$month]/$date[$year]
]
$color[#5865F2]
$sendMessage[]
```

### Commande de vérification

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $let[target;$findUser[$message]]
  $if[$target!=]
    $let[reason;$getBanReason[$target]]
    $if[$reason!=]
      $sendMessage[**$userName[$target]** est banni. Raison : $reason]
    $else
      $sendMessage[**$userName[$target]** n'est pas banni.]
    $endif
  $else
    $sendMessage[Utilisateur introuvable.]
  $endif
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- La raison est stockée par Discord et persistante.
- Utile pour les logs de modération et la transparence.
- Seuls les utilisateurs avec `BAN_MEMBERS` peuvent voir les raisons.
- Fonctionne uniquement sur le serveur courant.
