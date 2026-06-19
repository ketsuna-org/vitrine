---
layout: doc
title: $disableInnerSpaceRemoval
translation_key: docs
category: "Flags & Debug"
function_name: disableInnerSpaceRemoval
syntax: $disableInnerSpaceRemoval
description: Désactive la suppression automatique des espaces internes dans les paramètres des fonctions BDFD. Par défaut, BDFD nettoie les espaces superflus.
---
# $disableInnerSpaceRemoval

La fonction `$disableInnerSpaceRemoval` **désactive la suppression automatique des espaces** dans les paramètres. Par défaut, BDFD nettoie les espaces en début/fin de paramètres.

## Syntaxe

```
$disableInnerSpaceRemoval
```

## Paramètres

Aucun.

## Valeur de retour

Aucune.

## Comportement

- Sans cette fonction : `$sendMessage[  Hello  ]` devient `Hello`
- Avec cette fonction : les espaces internes et périphériques sont conservés.
- Utile pour la mise en forme de texte (art ASCII, indentation, etc.).

## Exemples

### Conserver l'indentation

```bdfd
$disableInnerSpaceRemoval
$sendMessage[
╔══════════════╗
║   Bienvenue   ║
╚══════════════╝
]
```

### Préserver les espaces dans un texte

```bdfd
$disableInnerSpaceRemoval
$let[codeBlock;    function hello() {        return "world";    }]
$sendMessage[```js
$codeBlock
```]
```

### Comparaison

```bdfd
; Sans $disableInnerSpaceRemoval
$sendMessage[  Hello  World  ]
; Résultat : Hello World

$disableInnerSpaceRemoval
$sendMessage[  Hello  World  ]
; Résultat :   Hello  World
```

## Notes

- Effet limité à la commande en cours.
- À placer au début si toute la commande nécessite la préservation d'espaces.
- Ne désactive pas le traitement des caractères spéciaux (voir `$disableSpecialEscaping`).
