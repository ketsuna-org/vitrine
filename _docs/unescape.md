---
layout: doc
title: $unEscape
translation_key: docs
category: "Text Manipulation"
function_name: unEscape
syntax: $unEscape[text]
description: Converts thes séquences of échappement of une string en leurs becauseactères réels. Par exemple, \n devient un vrai saut of ligne.
---
# $unEscape

The function `$unEscape[]` **convertedt les séquences of échappement** (`\n`, `\t`, `\\`, etc.) en leurs becauseactères réels.

## Syntax

```
$unEscape[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | String contenant séquences of échappement to résoudre. |

## Return Value

- **Type** : String
- Le text with séquences of échappement resolvedes.

## Séquences supportées

| Séquence | Result |
|---|---|
| `\n` | Saut of ligne |
| `\t` | Tabulation |
| `\\` | Backslash |
| `\"` | Guillemet double |
| `\'` | Guillemet simple |

## Examples

### Text multi-lignes

```bdfd
$sendMessage[$unEscape[Line 1\nLine 2\nLine 3]]
```

### Message formatted dethen une variable

```bdfd
$let[data;Nom: John\nÂge: 25\nVille: Paris]
$sendMessage[$unEscape[$var[data]]]
```

### Code with guillemets

```bdfd
$sendMessage[$unEscape[Il a dit : \"Bonday !\"]]
```

### Embed with description formattede

```bdfd
$title[Informations]
$description[$unEscape[**User** : $username\n**ID** : $authorID\n**Role** : $getRole[$authorID;1]]]
$sendMessage[]
```

## Notes

- Ne pas confondre with `$disableSpecialEscaping` qui désactive l'interprstateion BDFD.
- Utile pour formater of the text stocké in variables or bases of datas.
- Pour encoder of the text pour URL, utilisez `$urlEncode[]`.
