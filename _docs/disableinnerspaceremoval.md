---
layout: doc
title: $disableInnerSpaceRemoval
translation_key: docs
category: "Flags & Debug"
function_name: disableInnerSpaceRemoval
syntax: $disableInnerSpaceRemoval
description: Désactive la suppression automatique des espaces internals in thes parameters des functions BDFD. Par default, BDFD nettoie les espaces superflus.
---
# $disableInnerSpaceRemoval

The `$disableInnerSpaceRemoval` function **désactive la suppression automatique des espaces** in thes parameters. Par default, BDFD nettoie les espaces en début/fin de parameters.

## Syntax

```
$disableInnerSpaceRemoval
```

## Parameters

Aucun.

## Return value

None.

## Behavior

- Without cette function : `$sendMessage[  Hello  ]` devient `Hello`
- Avec cette function : les espaces internals and périphériques sont conservés.
- Utile for the mise en forme de text (art ASCII, indentation, etc.).

## Examples

### Conserver l'indentation

```bdfd
$disableInnerSpaceRemoval
$sendMessage[
╔══════════════╗
║   Bienvenue   ║
╚══════════════╝
]
```

### Préserver les espaces dans un text

```bdfd
$disableInnerSpaceRemoval
$let[codeBlock;    function hello() {        return "world";    }]
$sendMessage[```js
$codeBlock
```]
```

### Compareason

```bdfd
; Without $disableInnerSpaceRemoval
$sendMessage[  Hello  World  ]
; Result : Hello World

$disableInnerSpaceRemoval
$sendMessage[  Hello  World  ]
; Result :   Hello  World
```

## Notes

- Effet limité à la command in progress.
- À placer at the beginning si toute la command requires the préservation d'espaces.
- Ne désactive pas the processing des becauseactères special (voir `$disableSpecialEscaping`).
