---
layout: doc
title: $getCustomStatus
translation_key: docs
category: "Entity Info"
function_name: getCustomStatus
syntax: $getCustomStatus[(userID)]
description: Gets the status custom (text and emoji) of a user Discord. Returns the text du status custom.
---

# $getCustomStatus

The function `$getCustomStatus[]` allows **récupérer le status custom** of a user Discord. The status custom est un text libre (et optionally un emoji) que the user définit dans son profil.

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
- Le text du status custom of the user.
- String vide si the user n'a pas défini de status custom.

## Behavior

- Reads the status custom dethen la présence Discord of the user.
- Ne retourne que le text, pas l'emoji optionally associé.
- The user must be visible par the bot (partage de server, présence accessible).

## Examples

### Affichage simple

```bdfd
$title[💬 Status custom]
$let[status;$getCustomStatus[$authorID]]
$if[$status!=]
  Votre status custom : **$status**
$else
  Vous n'avez pas défini de status custom.
$endif
$sendMessage[]
```

### Carte de profil enrichie

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

### Log de changement de status

```bdfd
$let[newStatus;$getCustomStatus[$authorID]]
$if[$newStatus!=]
  📝 **$userName** a changé son status custom : *$newStatus*
$endif
```

## Notes

- Le status custom est distinct du status de présence (online, occupé, etc.) qui est récupéré via `$userStatus[]`.
- Si the user a défini un emoji dans son status, seul le text est retourné.
- Le status custom peut contenir until 128 becauseactères.
