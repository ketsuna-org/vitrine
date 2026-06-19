---
layout: doc
title: $rolePosition
translation_key: docs
category: "Entity Info"
function_name: rolePosition
syntax: $rolePosition[roleID;(guildID)]
description: Retourne la position hiérarchique d'un rôle dans la liste des rôles du serveur.
parameters:
  - name: roleID
    description: L'ID du rôle cible.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: integer
    description: La position du rôle (entier, plus élevé = plus haut dans la hiérarchie).
related:
  - $roleInfo
  - $roleName
  - $roleColor
  - $channelPosition
examples:
  - description: Position d'un rôle
    code: $sendMessage[Position Admin : $rolePosition[$roleID[Admin]]]
  - description: Comparer deux rôles
    code: |
      $if[$rolePosition[$roleID[Admin]]>$rolePosition[$roleID[Modo]]]
        $sendMessage[Admin est supérieur à Modo.]
      $endif
---

# $rolePosition

La fonction `$rolePosition` retourne la **position hiérarchique** d'un rôle Discord. Plus la position est élevée, plus le rôle est haut dans la hiérarchie du serveur.

## Syntaxe

```
$rolePosition[roleID;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle. Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

| Type | Description |
|---|---|
| `integer` | La position du rôle dans la hiérarchie. |

## Exemples

### Afficher la position

```bdfd
$sendMessage[Position du rôle Admin : $rolePosition[$roleID[Admin]]]
```

### Comparer deux rôles

```bdfd
$if[$rolePosition[$roleID[Admin]]>$rolePosition[$roleID[Modo]]]
  $sendMessage[Le rôle Admin est hiérarchiquement supérieur à Modo.]
$else
  $sendMessage[Modo est supérieur ou égal à Admin.]
$endif
```

### Vérifier si un rôle peut en gérer un autre

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]>$rolePosition[$roleID[Cible]]]
  $sendMessage[Votre rôle est supérieur.]
$else
  $sendMessage[Vous ne pouvez pas agir car votre rôle est inférieur ou égal.]
$endif
```

### Obtenir le rôle le plus haut

```bdfd
$sendMessage[Rôle le plus haut du serveur : $roleName[$roleID[$roleNames]]]
```

## Notes

- `@everyone` a toujours la position `0`.
- Les positions sont uniques : deux rôles ne peuvent pas avoir la même position.
- Un bot ne peut pas modifier les rôles supérieurs au sien.
