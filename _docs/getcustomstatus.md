---
layout: doc
title: $getCustomStatus
translation_key: docs
category: "Entity Info"
function_name: getCustomStatus
syntax: $getCustomStatus[(userID)]
description: Gets the status custom (text and emoji) of a user Discord. Returns the text of the status custom.
---

# $getCustomStatus

The function `$getCustomStatus[]` allows **récupérer le status custom** of a user Discord. The status custom est un text libre (et optionally un emoji) que the user définit in son profil.

## Syntax

```
$getCustomStatus[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the user cible. Par default l'auteur of the command. |

## Return Value

- **Type** : String
- Le text of the status custom of the user.
- String vide si the user n'a pas défini of status custom.

## Behavior

- Reads the status custom dethen la présence Discord of the user.
- Ne retourne que le text, pas l'emoji optionally associé.
- The user must be visible par the bot (partage of server, présence accessible).

## Examples

### Affichage simple

```bdfd
$title[💬 Status custom]
$let[status;$getCustomStatus[$authorID]]
$if[$status!=]
  Votre status custom : **$status**
$else
  Vous n'avez pas défini of status custom.
$endif
$sendMessage[]
```

### Carte of profil enrichie

```bdfd
$title[👤 $userName[$mentioned[1]]]
$description[
**Status :** $userStatus[$mentioned[1]]
**Status perso :** $getCustomStatus[$mentioned[1]]
**HypeSquad :** $hypeSquad[$mentioned[1]]
]
$thumbnail[$userAvatar[$mentioned[1]]]
$color[#5865F2]
$sendMessage[]
```

### Log of changement of status

```bdfd
$let[newStatus;$getCustomStatus[$authorID]]
$if[$newStatus!=]
  📝 **$userName** a changé son status custom : *$newStatus*
$endif
```

## Notes

- Le status custom est distinct of the status of présence (online, occupé, etc.) qui est récupéré via `$userStatus[]`.
- Si the user a défini un emoji in son status, seul le text est retourné.
- Le status custom peut contain atil 128 becauseactères.
