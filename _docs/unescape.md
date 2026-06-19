---
layout: doc
title: $unEscape
translation_key: docs
category: "Text Manipulation"
function_name: unEscape
syntax: $unEscape[text]
description: Convertit les séquences d'échappement d'une chaîne en leurs caractères réels. Par exemple, \n devient un vrai saut de ligne.
---
# $unEscape

La fonction `$unEscape[]` **convertit les séquences d'échappement** (`\n`, `\t`, `\\`, etc.) en leurs caractères réels.

## Syntaxe

```
$unEscape[text]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Chaîne contenant des séquences d'échappement à résoudre. |

## Valeur de retour

- **Type** : Chaîne
- Le texte avec séquences d'échappement résolues.

## Séquences supportées

| Séquence | Résultat |
|---|---|
| `\n` | Saut de ligne |
| `\t` | Tabulation |
| `\\` | Backslash |
| `\"` | Guillemet double |
| `\'` | Guillemet simple |

## Exemples

### Texte multi-lignes

```bdfd
$sendMessage[$unEscape[Line 1\nLine 2\nLine 3]]
```

### Message formaté depuis une variable

```bdfd
$let[data;Nom: John\nÂge: 25\nVille: Paris]
$sendMessage[$unEscape[$var[data]]]
```

### Code avec guillemets

```bdfd
$sendMessage[$unEscape[Il a dit : \"Bonjour !\"]]
```

### Embed avec description formatée

```bdfd
$title[Informations]
$description[$unEscape[**Utilisateur** : $username\n**ID** : $authorID\n**Rôle** : $getRole[$authorID;1]]]
$sendMessage[]
```

## Notes

- Ne pas confondre avec `$disableSpecialEscaping` qui désactive l'interprétation BDFD.
- Utile pour formater du texte stocké dans des variables ou bases de données.
- Pour encoder du texte pour URL, utilisez `$urlEncode[]`.
