---
layout: doc
title: $unEscape
translation_key: docs
category: "Text Manipulation"
function_name: unEscape
syntax: $unEscape[text]
description: Converts thes séquences d'échappement d'une string en leurs becauseactères réels. Par exemple, \n devient un vrai saut de ligne.
---
# $unEscape

The function `$unEscape[]` **convertedt les séquences d'échappement** (`\n`, `\t`, `\\`, etc.) en leurs becauseactères réels.

## Syntax

```
$unEscape[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | String contenant des séquences d'échappement à résoudre. |

## Return Value

- **Type** : String
- Le text avec séquences d'échappement resolvedes.

## Séquences supportées

| Séquence | Result |
|---|---|
| `\n` | Saut de ligne |
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

### Code avec guillemets

```bdfd
$sendMessage[$unEscape[Il a dit : \"Bonday !\"]]
```

### Embed avec description formattede

```bdfd
$title[Informations]
$description[$unEscape[**User** : $username\n**ID** : $authorID\n**Role** : $getRole[$authorID;1]]]
$sendMessage[]
```

## Notes

- Ne pas confondre avec `$disableSpecialEscaping` qui désactive l'interprstateion BDFD.
- Utile pour formater du text stocké dans des variables or bases de datas.
- Pour encoder du text pour URL, utilisez `$urlEncode[]`.
