---
layout: doc
title: $disableInnerSpaceRemoval
translation_key: docs
category: "Flags & Debug"
function_name: disableInnerSpaceRemoval
syntax: $disableInnerSpaceRemoval
description: Désactive la suppression automatique espaces internals in thes parameters functions BDFD. Par default, BDFD nettoie les espaces superflus.
---
# $disableInnerSpaceRemoval

The `$disableInnerSpaceRemoval` function **désactive la suppression automatique espaces** in thes parameters. Par default, BDFD nettoie les espaces en début/fin of parameters.

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
- Utile for the mise en forme of text (art ASCII, indentation, etc.).

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

### Préserver les espaces in a text

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

- Effet limité to la command in progress.
- À placer at the beginning si toute la command requires the préservation of espaces.
- Ne désactive pas the processing becauseactères special (voir `$disableSpecialEscaping`).
