---
layout: doc
title: $hypeSquad
translation_key: docs
category: "Entity Info"
function_name: hypeSquad
syntax: $hypeSquad[(userID)]
description: Retourne la maison HypeSquad à laquelle appartient l'utilisateur (Bravery, Brilliance, Balance) ou "None" s'il n'en fait pas partie.
---

# $hypeSquad

La fonction `$hypeSquad[]` permet de **connaître la maison HypeSquad** d'un utilisateur Discord. Retourne `Bravery`, `Brilliance`, `Balance` ou `None`.

## Syntaxe

```
$hypeSquad[(userID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | Optionnel - L'ID de l'utilisateur. Par défaut l'auteur de la commande. |

## Valeur de retour

- **Type** : String
- `Bravery` - Maison du Courage (violet)
- `Brilliance` - Maison de la Brillance (orange)
- `Balance` - Maison de l'Équilibre (vert)
- `None` - L'utilisateur n'a pas rejoint de maison HypeSquad.

## Comportement

- Vérifie le profil Discord de l'utilisateur pour déterminer sa maison HypeSquad.
- La participation à HypeSquad est une option de profil Discord, distincte du programme HypeSquad Events.
- Retourne `None` si l'utilisateur n'a pas choisi de maison.

## Exemples

### Affichage simple

```bdfd
$title[🏠 HypeSquad]
$description[Votre maison HypeSquad : **$hypeSquad**]
$sendMessage[]
```

### Emoji personnalisé selon la maison

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

### Fiche utilisateur complète

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

- Nécessite que l'utilisateur ait configuré sa maison HypeSquad dans ses paramètres Discord.
- Distinct des badges (le badge HypeSquad est géré par `$hasBadge` / `$userBadges`).
- Les noms de maisons sont retournés en anglais (Bravery, Brilliance, Balance).
