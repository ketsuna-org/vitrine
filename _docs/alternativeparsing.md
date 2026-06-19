---
layout: doc
title: $alternativeParsing
translation_key: docs
category: "Flags & Debug"
function_name: alternativeParsing
syntax: $alternativeParsing
description: Active un mode of parsing alternatif for the command in progress. Utile pour résoudre certains conflits of syntax or comportements inattendus of the parseur BDFD.
---
# $alternativeParsing

The `$alternativeParsing` function active un **mode of parsing alternatif** for the command in progress. Ce mode utilise une logique of traitement differente qui peut résoudre problèmes of compatibilité.

## Syntax

```
$alternativeParsing
```

## Parameters

Aucun.

## Return value

None.

## Behavior

- Change la façon dont BDFD interprète and exécute the code of the command.
- Peut résoudre bugs liés to the crochets `[]` imbriqués or to the becauseactères special.
- Effet limité to la command in progress.

## Examples

### Résoudre un confreads of crochets

```bdfd
$alternativeParsing
$sendMessage[$replaceText[Hello [World];[ ];-]]
```

### Command with syntax complex

```bdfd
$alternativeParsing
$if[$checkContains[$input;[==true]
  $sendMessage[Contenu détecté.]
$else
  $sendMessage[Aucun contenu.]
$endif
```

## Notes

- À use when le parsing standard cause of errors inexpliquées.
- Peut légèrement raslowir l'execution.
- À placer en début of command, before tout autre code.
- Alternative to `$optOff` for problèmes purement syntaxiques.
