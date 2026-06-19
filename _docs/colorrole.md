---
layout: doc
title: $colorRole
translation_key: docs
category: "Entity Info"
function_name: colorRole
syntax: $colorRole[userID;(guildID)]
description: Retourne la couleur du rôle le plus élevé d'un utilisateur, en hexadécimal.
parameters:
  - name: userID
    description: L'ID de l'utilisateur cible.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: string
    description: La couleur hexadécimale du rôle le plus haut de l'utilisateur, ou "" si aucun rôle coloré.
related:
  - $roleColor
  - $getRole
  - $roleName
  - $color
examples:
  - description: Couleur du rôle de l'auteur
    code: $sendMessage[Votre couleur : $colorRole[$authorID]]
  - description: Embed avec la couleur du rôle
    code: |
      $title[Profil]
      $description[Votre plus haut rôle coloré]
      $color[$colorRole[$authorID]]
      $sendMessage[]
---

# $colorRole

La fonction `$colorRole` retourne la **couleur hexadécimale** du rôle le plus élevé d'un utilisateur qui possède une couleur. Très utile pour personnaliser des embeds selon le rôle de l'utilisateur.

## Syntaxe

```
$colorRole[userID;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur. Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Couleur hexadécimale (ex: `#5865F2`), ou `""` si aucun rôle coloré. |

## Exemples

### Afficher la couleur

```bdfd
$sendMessage[Votre couleur de rôle : $colorRole[$authorID]]
```

### Embed personnalisé

```bdfd
$title[Profil de $username]
$description[
**Rôle :** $roleName[$getRole[$authorID;1]]
**Couleur :** $colorRole[$authorID]
]
$color[$colorRole[$authorID]]
$sendMessage[]
```

### Couleur d'un autre utilisateur

```bdfd
$sendMessage[Couleur de <@$mentioned[1]> : $colorRole[$mentioned[1]]]
```

### Fallback si pas de couleur

```bdfd
$if[$colorRole[$authorID]!=]
  $color[$colorRole[$authorID]]
$else
  $color[#5865F2]
$endif
$title[Profil]
$description[Informations utilisateur]
$sendMessage[]
```

## Notes

- Retourne une chaîne vide si l'utilisateur n'a pas de rôle avec une couleur.
- La couleur est au format hexadécimal avec `#`.
- Parfait pour `$color[]` dans les embeds.
- À la différence de `$roleColor`, `$colorRole` cible un **utilisateur**, pas un rôle.
