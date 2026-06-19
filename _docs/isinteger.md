---
layout: doc
title: $isInteger
translation_key: docs
category: "Math & Text"
function_name: isInteger
syntax: $isInteger[value]
description: Vérifie si une valeur est un nombre entier (positif, négatif ou zéro).
---

# $isInteger

La fonction `$isInteger[value]` **vérifie si une valeur est un nombre entier** (sans décimale). Elle accepte les entiers positifs, négatifs et zéro.

## Syntaxe

```
$isInteger[value]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `value` | La valeur à tester. |

## Valeur de retour

- **Type** : Booléen
- `true` si `value` est un entier (ex: `42`, `-7`, `0`)
- `false` si `value` est un décimal, du texte, ou vide.

## Comportement

- Les nombres à virgule (`3.14`, `2.0`) retournent `false`.
- Les entiers en notation scientifique ne sont pas reconnus.
- `0` est un entier valide.
- Les espaces autour du nombre peuvent invalider le test.

## Exemples

### Validation d'un paramètre

```bdfd
$if[$isInteger[$message[1]]==true]
  $sendMessage[✅ $message[1] est un entier valide.]
$else
  $sendMessage[❌ Veuillez fournir un nombre entier.]
$endif
```

### Pagination (validation)

```bdfd
$var[page;$message[1]]
$if[$isInteger[$var[page]]==true]
  $if[$var[page]>=1]
    $sendMessage[📄 Affichage de la page $var[page]...]
  $else
    $sendMessage[❌ La page doit être >= 1.]
  $endif
$else
  $sendMessage[❌ Paramètre invalide. Usage: !page <nombre>]
$endif
```

### Compteur personnalisé

```bdfd
$var[nombre;$message[1]]
$if[$isInteger[$var[nombre]]==true]
  $for[i;1;$var[nombre];1]
    Compteur : $for[i]
  $endfor
$else
  $sendMessage[Veuillez entrer un entier.]
$endif
```

## Notes

- `$isInteger[42]` retourne `true`.
- `$isInteger[-10]` retourne `true`.
- `$isInteger[3.14]` retourne `false`.
- `$isInteger[abc]` retourne `false`.
- Pour accepter aussi les décimaux, utilisez `$isNumber[]`.
