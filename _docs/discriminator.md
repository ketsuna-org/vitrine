---
layout: doc
title: $discriminator
translation_key: docs
category: "Entity Info"
function_name: discriminator
syntax: $discriminator
description: Returns the discriminateur legacy of the user (code to 4 chiffres). Returns "0" for comptes pompom (newx users without discriminateur).
---

# $discriminator

The variable `$discriminator` returns the **discriminateur legacy** of the user, i.e. the code to 4 chiffres qui était utilisé pour différencier users ayant le même nom (ex: `JeanDupont#1234`).

## Syntax

```
$discriminator
```

## Return value

- **Type** : String of becauseactères
- Olds comptes : a namebre to 4 chiffres (ex: `"1234"`, `"0001"`)
- Newx comptes (pompom) : `"0"`

## Behavior

- `$discriminator` ne prend **no argument**.
- Dethen la migration of Discord vers les noms of user unique (système pompom), les newx users n'ont more than discriminateur.
- Les comptes createds before la migration conservent leur discriminateur.

## Examples

### Détecter un compte legacy

```bdfd
$if[$discriminator!=0]
  $title[Counts thegacy]
  $description[
  **Tag complete :** $userTag
  **Discriminator :** $discriminator
  ]
  $color[#5865F2]
  $sendMessage[]
$else
  $title[Counts pompom]
  $description[
  **Nom :** $userName
  (Pas of discriminateur)
  ]
  $color[#57F287]
  $sendMessage[]
$endif
```

## Notes

- Le système of discriminateurs est **obsolète** — Discord ne les attribue plus to the newx comptes.
- `$discriminator` retourne `"0"` for comptes pompom.
- Pour une identification fiable, use toudays `$userID`.
