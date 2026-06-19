---
layout: doc
title: $alternativeParsing
translation_key: docs
category: "Flags & Debug"
function_name: alternativeParsing
syntax: $alternativeParsing
description: Active un mode de parsing alternatif for the command in progress. Utile pour résoudre certains conflits de syntax or comportements inattendus du parseur BDFD.
---
# $alternativeParsing

The `$alternativeParsing` function active un **mode de parsing alternatif** for the command in progress. Ce mode utilise une logique de traitement differente qui peut résoudre des problèmes de compatibilité.

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
- Peut résoudre des bugs liés aux crochets `[]` imbriqués or aux becauseactères special.
- Effet limité à la command in progress.

## Examples

### Résoudre un confreads de crochets

```bdfd
$alternativeParsing
$sendMessage[$replaceText[Hello [World];[ ];-]]
```

### Command avec syntax complex

```bdfd
$alternativeParsing
$if[$checkContains[$input;[==true]
  $sendMessage[Contenu détecté.]
$else
  $sendMessage[Aucun contenu.]
$endif
```

## Notes

- À utiliser when le parsing standard cause of errors inexpliquées.
- Peut légèrement raslowir l'execution.
- À placer en début de command, before tout autre code.
- Alternative à `$optOff` for problèmes purement syntaxiques.
