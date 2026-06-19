---
layout: doc
title: $alternativeParsing
translation_key: docs
category: "Flags & Debug"
function_name: alternativeParsing
syntax: $alternativeParsing
description: Active un mode de parsing alternatif pour la commande en cours. Utile pour résoudre certains conflits de syntaxe ou comportements inattendus du parseur BDFD.
parameters: []
returns:
  - type: void
    description: Active le parsing alternatif. Ne retourne rien.
related:
  - $optOff
  - $disableSpecialEscaping
  - $disableInnerSpaceRemoval
examples:
  - description: Activer le parsing alternatif
    code: |
      $alternativeParsing
      $sendMessage[Parsing alternatif activé.]
---
# $alternativeParsing

La fonction `$alternativeParsing` active un **mode de parsing alternatif** pour la commande en cours. Ce mode utilise une logique de traitement différente qui peut résoudre des problèmes de compatibilité.

## Syntaxe

```
$alternativeParsing
```

## Paramètres

Aucun.

## Valeur de retour

Aucune.

## Comportement

- Change la façon dont BDFD interprète et exécute le code de la commande.
- Peut résoudre des bugs liés aux crochets `[]` imbriqués ou aux caractères spéciaux.
- Effet limité à la commande en cours.

## Exemples

### Résoudre un conflit de crochets

```bdfd
$alternativeParsing
$sendMessage[$replaceText[Hello [World];[ ];-]]
```

### Commande avec syntaxe complexe

```bdfd
$alternativeParsing
$if[$checkContains[$input;[==true]
  $sendMessage[Contenu détecté.]
$else
  $sendMessage[Aucun contenu.]
$endif
```

## Notes

- À utiliser quand le parsing standard cause des erreurs inexpliquées.
- Peut légèrement ralentir l'exécution.
- À placer en début de commande, avant tout autre code.
- Alternative à `$optOff` pour les problèmes purement syntaxiques.
