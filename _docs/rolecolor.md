---
layout: doc
title: $roleColor
translation_key: docs
category: "Entity Info"
function_name: roleColor
syntax: $roleColor[roleID;(guildID)]
description: Retourne la couleur d'un rôle Discord en hexadécimal.
parameters:
  - name: roleID
    description: L'ID du rôle cible.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: string
    description: "La couleur hexadécimale du rôle (ex: #5865F2), ou chaîne vide si pas de couleur."
related:
  - $roleInfo
  - $roleName
  - $colorRole
  - $color
examples:
  - description: Couleur d'un rôle
    code: "$sendMessage[Couleur Admin : $roleColor[$roleID[Admin]]]"
  - description: Embed avec couleur du rôle
    code: |
      $title[Info rôle]
      $description[Couleur : $roleColor[123456789012345678]]
      $color[$roleColor[123456789012345678]]
      $sendMessage[]
---

# $roleColor

La fonction `$roleColor` retourne la **couleur** d'un rôle Discord au format hexadécimal. Si le rôle n'a pas de couleur définie, elle retourne une chaîne vide.

## Syntaxe

```
$roleColor[roleID;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle. Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | La couleur en hexadécimal (ex: `#5865F2`), ou `""` si pas de couleur. |

## Exemples

### Afficher la couleur

```bdfd
$sendMessage[Couleur du rôle Admin : $roleColor[$roleID[Admin]]]
```

### Embed coloré selon le rôle

```bdfd
$title[Rôle $roleName[$getRole[$authorID;1]]]
$description[Voici votre rôle principal.]
$color[$roleColor[$getRole[$authorID;1]]]
$sendMessage[]
```

### Vérifier si le rôle a une couleur

```bdfd
$if[$roleColor[$roleID[Membre]]!=]
  $sendMessage[Couleur : $roleColor[$roleID[Membre]]]
$else
  $sendMessage[Ce rôle n'a pas de couleur.]
$endif
```

### Couleur du rôle d'un utilisateur

```bdfd
$sendMessage[Votre couleur de rôle : $colorRole[$authorID]]
```

## Notes

- La couleur est retournée avec le préfixe `#`.
- Si le rôle n'a pas de couleur, la valeur est une chaîne vide (`""`).
- Pour obtenir la couleur du rôle le plus haut d'un utilisateur, utilisez `$colorRole`.
