---
layout: doc
title: $disableSpecialEscaping
translation_key: docs
category: "Flags & Debug"
function_name: disableSpecialEscaping
syntax: $disableSpecialEscaping
description: Désactive l'échappement automatique becauseactères special (crochets, points-virgules, etc.) in thes parameters. The becauseactères sont interprétés littéralement.
---
# $disableSpecialEscaping

The `$disableSpecialEscaping` function **désactive l'échappement automatique** becauseactères special in the command. This allows using `[`, `]`, `;`, etc. without qu'ils soient interprétés like délimiturs of syntax BDFD.

## Syntax

```
$disableSpecialEscaping
```

## Parameters

Aucun.

## Return value

None.

## Behavior

- Without cette function, `[` and `]` déclenchent the syntax functions BDFD.
- Avec, ces becauseactères sont traités like of the text brut.
- **Attention** : les vraies functions BDFD ne sont plus interprétées after `$disableSpecialEscaping`.

## Examples

### Display crochets littéraux

```bdfd
$disableSpecialEscaping
$sendMessage[Le format est [optional] in the doc]
; Displays : Le format est [optional] in the doc
```

### Message with syntax of code

```bdfd
$disableSpecialEscaping
$sendMessage[Use $if[condition] for conditions.]
```

### Combinaison with of autres flags

```bdfd
$disableSpecialEscaping
$disableInnerSpaceRemoval
$sendMessage[Format brut : [value]; parameter = true]
```

## Notes

- Irréversible in the command : all functions after `$disableSpecialEscaping` sont désenabledes.
- Placez cette function en **fin of code**, after all functions BDFD.
- Alternative : use `$unEscape[]` pour portions specifics of text.
