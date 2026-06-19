---
layout: doc
title: $getRole
translation_key: docs
category: "Entity Info"
function_name: getRole
syntax: $getRole[userID;index;(guildID)]
description: Returns the ID of a role of a user selon son index (position) in the list des roles du member.
---

# $getRole

The function `$getRole` retourne l'**ID of a role** of a user depending on sa **position** dans sa list de roles. The index `1` correspond au role le plus élevé hiérarchiquement, `2` au twoième, and ainsi de suite.

## Syntax

```
$getRole[userID;index;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user. Required. |
| `index` | The position of the role (1 = plus haut, 2 = twoième...). Required. |
| `guildID` | Optional. The ID of the server cible. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role à the position data, or `""` si l'index est invalid. |

## Examples

### Role le plus élevé

```bdfd
$sendMessage[Votre role le plus haut : $roleName[$getRole[$authorID;1]]]
```

### Vérifier si admin

```bdfd
$if[$getRole[$authorID;1]==$roleID[Admin]]
  $sendMessage[Vous êtes administrator !]
$else
  $sendMessage[Vous n'êtes pas administrator.]
$endif
```

### Role secondary

```bdfd
$sendMessage[Votre twoième role : $roleName[$getRole[$authorID;2]]]
```

### Couleur of the role principal

```bdfd
$title[Profil]
$description[Couleur de votre role principal]
$color[$roleColor[$getRole[$authorID;1]]]
$sendMessage[]
```

### Role d'un autre user

```bdfd
$sendMessage[Role principal de <@$mentioned[1]> : $roleName[$getRole[$mentioned[1];1]]]
```

## Notes

- L'index commence à `1` (pas `0`).
- Si the user n'a pas de role (only @everyone), `$getRole` peut retourner une string vide.
- Pour obtenir the color of the role le plus haut, utilisez directly `$colorRole[$userID]`.
- Pour listr all roles of a user, itérez with ae boucle.
