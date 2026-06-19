---
layout: doc
title: $disableSpecialEscaping
translation_key: docs
category: "Flags & Debug"
function_name: disableSpecialEscaping
syntax: $disableSpecialEscaping
description: Désactive l'échappement automatique des caractères spéciaux (crochets, points-virgules, etc.) dans les paramètres. Les caractères sont interprétés littéralement.
parameters: []
returns:
  - type: void
    description: Désactive l'échappement spécial. Ne retourne rien.
related:
  - $alternativeParsing
  - $disableInnerSpaceRemoval
  - $unEscape
examples:
  - description: Désactiver l'échappement
    code: |
      $disableSpecialEscaping
      $sendMessage[Utilisez [crochets] et des points-virgules;librement]
---
# $disableSpecialEscaping

La fonction `$disableSpecialEscaping` **désactive l'échappement automatique** des caractères spéciaux dans la commande. Cela permet d'utiliser `[`, `]`, `;`, etc. sans qu'ils soient interprétés comme des délimiteurs de syntaxe BDFD.

## Syntaxe

```
$disableSpecialEscaping
```

## Paramètres

Aucun.

## Valeur de retour

Aucune.

## Comportement

- Sans cette fonction, `[` et `]` déclenchent la syntaxe des fonctions BDFD.
- Avec, ces caractères sont traités comme du texte brut.
- **Attention** : les vraies fonctions BDFD ne sont plus interprétées après `$disableSpecialEscaping`.

## Exemples

### Afficher des crochets littéraux

```bdfd
$disableSpecialEscaping
$sendMessage[Le format est [optionnel] dans la doc]
; Affiche : Le format est [optionnel] dans la doc
```

### Message avec syntaxe de code

```bdfd
$disableSpecialEscaping
$sendMessage[Utilisez $if[condition] pour les conditions.]
```

### Combinaison avec d'autres flags

```bdfd
$disableSpecialEscaping
$disableInnerSpaceRemoval
$sendMessage[Format brut : [valeur]; paramètre = true]
```

## Notes

- Irréversible dans la commande : toutes les fonctions après `$disableSpecialEscaping` sont désactivées.
- Placez cette fonction en **fin de code**, après toutes les fonctions BDFD.
- Alternative : utilisez `$unEscape[]` pour des portions spécifiques de texte.
