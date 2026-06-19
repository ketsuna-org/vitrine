---
layout: doc
title: $unBan
translation_key: docs
category: "Moderation"
function_name: unBan
syntax: $unBan[userID]
description: Débannit un utilisateur du serveur en utilisant son ID. L'utilisateur pourra rejoindre le serveur à nouveau avec une nouvelle invitation.
parameters:
  - name: userID
    description: L'ID de l'utilisateur à débannir.
returns:
  - type: string
    description: Chaîne vide en cas de succès, ou message d'erreur en cas d'échec.
related:
  - $ban
  - $softBan
  - $unBanID
  - $isBanned
  - $getBanReason
examples:
  - description: Débannir un utilisateur par mention
    code: $unBan[$mentioned[1]]
  - description: Débannir par ID
    code: $unBan[123456789012345678]
---

# $unBan

La fonction `$unBan[]` permet de **débannir un utilisateur** du serveur en utilisant son ID Discord. Une fois débanni, l'utilisateur pourra rejoindre le serveur avec une nouvelle invitation.

## Syntaxe

```
$unBan[userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID Discord de l'utilisateur à débannir. |

## Valeur de retour

- **Type** : String (vide en cas de succès)
- Chaîne vide si le débannissement réussit.
- Message d'erreur si l'utilisateur n'est pas banni ou si le bot manque de permissions.

## Comportement

- Le bot doit avoir la permission `BAN_MEMBERS`.
- L'utilisateur doit être dans la liste des bannissements du serveur.
- L'ID peut être récupéré via `$mentioned[]`, `$findUser[]` ou tout autre moyen.
- L'utilisateur ne reçoit pas de notification de débannissement.

## Exemples

### Débannissement simple

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $unBan[$mentioned[1]]
  $sendMessage[✅ **$userName[$mentioned[1]]** a été débanni.]
$else
  $sendMessage[❌ Permission refusée.]
$endif
```

### Débannissement avec confirmation

```bdfd
$let[target;$mentioned[1]]

$if[$isBanned[$target]==true]
  $unBan[$target]
  $title[🔓 Débannissement]
  $description[
  **Utilisateur :** $userName[$target] ($target)
  **Ancienne raison :** $getBanReason[$target]
  **Débanni par :** $userName[$authorID]
  ]
  $color[#57F287]
  $sendMessage[]
$else
  $sendMessage[❌ Cet utilisateur n'est pas banni.]
$endif
```

### Commande avec ID manuel

```bdfd
$if[$message!=]
  $let[exists;$userExists[$message]]
  $if[$exists==true]
    $unBan[$message]
    $sendMessage[✅ Utilisateur **$message** débanni.]
  $elseif[$isBanned[$message]==true]
    $unBan[$message]
    $sendMessage[✅ Utilisateur **$message** débanni.]
  $else
    $sendMessage[❌ ID invalide ou utilisateur non banni.]
  $endif
$else
  $sendMessage[Veuillez fournir un ID utilisateur.]
$endif
```

## Notes

- L'utilisateur débanni ne rejoint pas automatiquement le serveur ; il doit utiliser une invitation.
- Ne fonctionne que si l'utilisateur est dans la liste des bannissements.
- L'ID est le seul moyen fiable, car un utilisateur banni n'est pas sur le serveur.
