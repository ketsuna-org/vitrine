---
layout: doc
title: $trimContent
translation_key: docs
category: "Text Manipulation"
function_name: trimContent
syntax: $trimContent[text]
description: Supprime les espaces en début et fin d'un texte (trim). Ne modifie pas les espaces à l'intérieur du texte.
---
# $trimContent

La fonction `$trimContent[]` **supprime les espaces** en début et fin d'une chaîne (trim).

## Syntaxe

```
$trimContent[text]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Le texte à nettoyer (espaces en début/fin supprimés). |

## Valeur de retour

- **Type** : Chaîne
- Le texte sans espaces au début ni à la fin.

## Comportement

- Ne touche PAS aux espaces entre les mots.
- Supprime espaces, tabulations, et retours à la ligne en début/fin.
- Très utile après une extraction ou une concaténation.

## Exemples

### Nettoyage simple

```bdfd
$sendMessage[Résultat : "$trimContent[   Hello World   ]"]
; Affiche : Résultat : "Hello World"
```

### Nettoyer une entrée utilisateur

```bdfd
$let[input;$trimContent[$message[2]]]
$sendMessage[Argument nettoyé : "$input"]
```

### Comparaison sans espaces

```bdfd
$if[$trimContent[$message[1]]==admin]
  $sendMessage[Mode admin activé.]
$endif
```

### Nettoyage après extraction

```bdfd
$let[extrait;$subString[$message;0;10]]
$let[clean;$trimContent[$extrait]]
$sendMessage[$clean]
```

## Notes

- Plus efficace que `$replaceText[text; ;]` car il ne modifie que les extrémités.
- Pour supprimer tous les espaces (y compris internes), utilisez `$replaceText[text; ;]`.
- Pour conserver TOUS les espaces, utilisez `$disableInnerSpaceRemoval`.
