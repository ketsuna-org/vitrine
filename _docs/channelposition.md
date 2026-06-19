---
layout: doc
title: $channelPosition
translation_key: docs
category: "Entity Info"
function_name: channelPosition
syntax: $channelPosition[(channelID)]
description: Retourne la position d'un salon dans la liste des salons Discord.
parameters:
  - name: channelID
    description: "Optionnel. L'ID du salon cible. Si omis, utilise le salon courant."
returns:
  - type: integer
    description: La position du salon (entier, 0 étant le plus haut).
related:
  - $channelID
  - $channelName
  - $channelCount
examples:
  - description: Position du salon courant
    code: "$sendMessage[Position : $channelPosition]"
  - description: Position d'un salon spécifique
    code: "$sendMessage[Position : $channelPosition[123456789012345678]]"
---

# $channelPosition

La fonction `$channelPosition` retourne la **position** d'un salon dans la liste des salons du serveur. La position `0` correspond au salon le plus haut, et les nombres augmentent en descendant.

## Syntaxe

```
$channelPosition[(channelID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | Optionnel. L'ID du salon cible. Si omis, le salon courant est utilisé. |

## Valeur de retour

| Type | Description |
|---|---|
| `integer` | La position du salon dans la liste (0 = tout en haut). |

## Exemples

### Afficher la position

```bdfd
$sendMessage[Ce salon est en position $channelPosition]
```

### Comparer les positions

```bdfd
$if[$channelPosition==0]
  $sendMessage[Ce salon est tout en haut du serveur !]
$else
  $sendMessage[Ce salon est en position #$channelPosition]
$endif
```

### Salon le plus haut d'une catégorie

```bdfd
$sendMessage[Position dans la catégorie : $channelPosition]
```

## Notes

- La position est relative à l'ordre d'affichage dans Discord.
- Les catégories ont leur propre système de positionnement.
- La position peut changer si un administrateur réorganise les salons.
- Les salons sont triés par position au sein de leur catégorie parente.
