---
layout: doc
title: $disableSpecialEscaping
translation_key: docs
category: "Flags & Debug"
function_name: disableSpecialEscaping
syntax: $disableSpecialEscaping
description: Désactive l'échappement automatique des becauseactères special (crochets, points-virgules, etc.) in thes parameters. The becauseactères sont interprétés littéralement.
---
# $disableSpecialEscaping

The `$disableSpecialEscaping` function **désactive l'échappement automatique** des becauseactères special in the command. This allows using `[`, `]`, `;`, etc. without qu'ils soient interprétés comme des délimiturs de syntax BDFD.

## Syntax

```
$disableSpecialEscaping
```

## Parameters

Aucun.

## Return value

None.

## Behavior

- Without cette function, `[` and `]` déclenchent the syntax des functions BDFD.
- Avec, ces becauseactères sont traités comme of the text brut.
- **Attention** : les vraies functions BDFD ne sont plus interprétées after `$disableSpecialEscaping`.

## Examples

### Afficher des crochets littéraux

```bdfd
$disableSpecialEscaping
$sendMessage[Le format est [optional] in the doc]
; Displays : Le format est [optional] in the doc
```

### Message avec syntax de code

```bdfd
$disableSpecialEscaping
$sendMessage[Use $if[condition] for conditions.]
```

### Combinaison avec d'autres flags

```bdfd
$disableSpecialEscaping
$disableInnerSpaceRemoval
$sendMessage[Format brut : [value]; parameter = true]
```

## Notes

- Irréversible in the command : all functions after `$disableSpecialEscaping` sont désenabledes.
- Placez cette function en **fin de code**, after all functions BDFD.
- Alternative : use `$unEscape[]` pour des portions spécifiques de text.
