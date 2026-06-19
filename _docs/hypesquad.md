---
layout: doc
title: $hypeSquad
translation_key: docs
category: "Entity Info"
function_name: hypeSquad
syntax: $hypeSquad[(userID)]
description: Returns the maison HypeSquad à laquelle appartient the user (Bravery, Brilliance, Balance) or "None" s'il n'en fait pas partie.
---

# $hypeSquad

The function `$hypeSquad[]` allows **connaître la maison HypeSquad** of a user Discord. Returns `Bravery`, `Brilliance`, `Balance` or `None`.

## Syntax

```
$hypeSquad[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the user. Par default l'auteur of the command. |

## Return Value

- **Type** : String
- `Bravery` - Maison du Courage (violet)
- `Brilliance` - Maison de la Brillance (orange)
- `Balance` - Maison de l'Équilibre (vert)
- `None` - The user n'a pas rejoint de maison HypeSquad.

## Behavior

- Checks le profil Discord of the user pour déterminer sa maison HypeSquad.
- La participation à HypeSquad est une option de profil Discord, distincte du programme HypeSquad Events.
- Returns `None` si the user n'a pas choisi de maison.

## Examples

### Affichage simple

```bdfd
$title[🏠 HypeSquad]
$description[Votre maison HypeSquad : **$hypeSquad**]
$sendMessage[]
```

### Emoji custom selon la maison

```bdfd
$let[house;$hypeSquad[$authorID]]

$if[$house==Bravery]
  🟣 Maison du Courage
$elseif[$house==Brilliance]
  🟠 Maison de la Brillance
$elseif[$house==Balance]
  🟢 Maison de l'Équilibre
$else
  ⚪ Aucune maison HypeSquad
$endif
```

### Fiche user complete

```bdfd
$title[👤 $userName[$mentioned[1]]]
$description[
**ID :** $mentioned[1]
**HypeSquad :** $hypeSquad[$mentioned[1]]
**Badges :** $userBadges[$mentioned[1]]
]
$thumbnail[$userAvatar[$mentioned[1]]]
$sendMessage[]
```

## Notes

- Requires que the user ait configured sa maison HypeSquad dans their parameters Discord.
- Distinct des badges (le badge HypeSquad est géré par `$hasBadge` / `$userBadges`).
- Les noms de maisons sont retournés en anglais (Bravery, Brilliance, Balance).
