---
layout: doc
title: $getBanReason
translation_key: docs
category: "Moderation"
function_name: getBanReason
syntax: $getBanReason[userID]
description: Gets the reason de ban of a user banni on the server. Returns the reason stockée in the list des bans of the server.
---

# $getBanReason

The function `$getBanReason[]` allows **récupérer la reason de ban** of a user banni on the server courant.

## Syntax

```
$getBanReason[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user banni. |

## Return Value

- **Type** : String
- La ban reason telle qu'enregistrée par Discord.
- String vide si the user is not banni or si noe reason n'was spécifiée.

## Behavior

- The bot doit avoir la permission `BAN_MEMBERS` pour voir les reasons de ban.
- La reason retournée est celle fournie lors du ban (via `$ban[userID;reason]`).
- Si the user is not banni, retourne une string vide.

## Examples

### Vérification de ban

```bdfd
$let[reason;$getBanReason[$mentioned[1]]]
$if[$reason!=]
  $title[🔨 User banni]
  $description[
  **User :** $userName[$mentioned[1]]
  **ID :** $mentioned[1]
  **Reason :** $reason
  ]
  $color[#ED4245]
  $sendMessage[]
$else
  $sendMessage[Cet user is not banni.]
$endif
```

### Log de ban

```bdfd
$let[reason;$getBanReason[$userID]]
$title[📋 Détails du ban]
$description[
**User :** $userName[$userID] ($userID)
**Reason du ban :** $reason
**Vérifié le :** $date[$day]/$date[$month]/$date[$year]
]
$color[#5865F2]
$sendMessage[]
```

### Command de vérification

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $let[target;$findUser[$message]]
  $if[$target!=]
    $let[reason;$getBanReason[$target]]
    $if[$reason!=]
      $sendMessage[**$userName[$target]** est banni. Reason : $reason]
    $else
      $sendMessage[**$userName[$target]** is not banni.]
    $endif
  $else
    $sendMessage[User introuvable.]
  $endif
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- La reason est stockée par Discord and persistante.
- Utile for the logs de modération and la transparence.
- Seuls les users avec `BAN_MEMBERS` peuvent voir les reasons.
- Functionne only on the server courant.
