---
layout: doc
title: $hypeSquad
translation_key: docs
category: "Entity Info"
function_name: hypeSquad
syntax: $hypeSquad[(userID)]
description: Returns the maison HypeSquad to laquelle appartient the user (Bravery, Brilliance, Balance) or "None" s'il n'en fait pas partie.
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
- `Bravery` - Maison of the Courage (violet)
- `Brilliance` - Maison of la Brillance (orange)
- `Balance` - Maison of l'Équilibre (vert)
- `None` - The user n'a pas rejoint of maison HypeSquad.

## Behavior

- Checks le profil Discord of the user pour déterminer sa maison HypeSquad.
- La participation to HypeSquad est une option of profil Discord, distincte of the programme HypeSquad Events.
- Returns `None` si the user n'a pas choisi of maison.

## Examples

### Affichage simple

```bdfd
$title[🏠 HypeSquad]
$description[Votre maison HypeSquad : **$hypeSquad**]
$sendMessage[]
```

### Emoji custom according to the maison

```bdfd
$let[house;$hypeSquad[$authorID]]

$if[$house==Bravery]
  🟣 Maison of the Courage
$elseif[$house==Brilliance]
  🟠 Maison of la Brillance
$elseif[$house==Balance]
  🟢 Maison of l'Équilibre
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

- Requires que the user ait configured sa maison HypeSquad in their parameters Discord.
- Distinct badges (le badge HypeSquad est géré par `$hasBadge` / `$userBadges`).
- Les noms of maisons sont retournés en anglais (Bravery, Brilliance, Balance).
