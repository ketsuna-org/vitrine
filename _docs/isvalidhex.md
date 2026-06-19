---
layout: doc
title: $isValidHex
translation_key: docs
category: "Math & Text"
function_name: isValidHex
syntax: $isValidHex[value]
description: Vérifie si une chaîne est un code couleur hexadécimal valide.
parameters:
  - name: value
    description: La chaîne à tester (avec ou sans #).
returns:
  - type: boolean
    description: true si le format hex est valide (#RRGGBB ou RRGGBB), false sinon.
related:
  - $isBoolean
  - $isInteger
  - $isNumber
  - $color
examples:
  - description: Tester un hex valide
    code: |
      $if[$isValidHex[#FF5733]==true]
        $sendMessage[Couleur valide !]
      $endif
  - description: Tester un hex invalide
    code: |
      $if[$isValidHex[#XYZ123]==false]
        $sendMessage[Couleur invalide.]
      $endif
---

# $isValidHex

La fonction `$isValidHex[value]` **vérifie si une chaîne est un code couleur hexadécimal valide** au format `#RRGGBB` (ou `RRGGBB` sans le dièse).

## Syntaxe

```
$isValidHex[value]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `value` | La chaîne à tester, avec ou sans le préfixe `#`. |

## Valeur de retour

- **Type** : Booléen
- `true` si la chaîne est un hexadécimal 6-caractères valide (0-9, A-F).
- `false` si la chaîne contient des caractères invalides, est trop courte/longue, ou vide.

## Comportement

- Accepte `#RRGGBB` et `RRGGBB` (6 caractères hexadécimaux).
- Les lettres sont insensibles à la casse (A-F ou a-f).
- Ne valide pas les formats courts (`#FFF`).
- Ne valide pas les formats avec alpha (`#RRGGBBAA`).

## Exemples

### Validation avant utilisation

```bdfd
$var[couleur;$message[1]]
$if[$isValidHex[$var[couleur]]==true]
  $embedAddField[Couleur;$var[couleur];yes]
  $color[$var[couleur]]
  $sendMessage[✅ Embed avec la couleur $var[couleur].]
$else
  $sendMessage[❌ Couleur invalide. Format attendu : #RRGGBB]
$endif
```

### Commande de rôle coloré

```bdfd
$var[couleur;$message[1]]
$if[$isValidHex[$var[couleur]]==true]
  $modifyRole[$roleID[Couleur];color;$var[couleur]]
  $sendMessage[🎨 La couleur du rôle a été changée en $var[couleur] !]
$else
  $sendMessage[❌ Format invalide. Exemple : !couleur #FF5733]
$endif
```

### Palette interactive

```bdfd
$var[hex;$message[1]]
$if[$isValidHex[$var[hex]]==true]
  $title[🎨 Aperçu couleur]
  $description[**Hex :** $var[hex]]
  $color[$var[hex]]
  $addTimestamp[]
  $sendMessage[]
$else
  $sendMessage[❌ Format hex invalide. Usage : !couleur #5865F2]
$endif
```

## Notes

- `$isValidHex[#FF0000]` retourne `true`.
- `$isValidHex[ff0000]` retourne `true`.
- `$isValidHex[#FFF]` retourne `false` (format court non supporté).
- `$isValidHex[#GG0000]` retourne `false` (G n'est pas hex).
- `$isValidHex[]` (vide) retourne `false`.
