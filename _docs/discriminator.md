---
layout: doc
title: $discriminator
translation_key: docs
category: "Entity Info"
function_name: discriminator
syntax: $discriminator
description: Retourne le discriminateur legacy de l'utilisateur (code à 4 chiffres). Retourne "0" pour les comptes pompom (nouveaux utilisateurs sans discriminateur).
---

# $discriminator

La variable `$discriminator` retourne le **discriminateur legacy** de l'utilisateur, c'est-à-dire le code à 4 chiffres qui était utilisé pour différencier les utilisateurs ayant le même nom (ex: `JeanDupont#1234`).

## Syntaxe

```
$discriminator
```

## Valeur de retour

- **Type** : Chaîne de caractères
- Anciens comptes : un nombre à 4 chiffres (ex: `"1234"`, `"0001"`)
- Nouveaux comptes (pompom) : `"0"`

## Comportement

- `$discriminator` ne prend **aucun argument**.
- Depuis la migration de Discord vers les noms d'utilisateur uniques (système pompom), les nouveaux utilisateurs n'ont plus de discriminateur.
- Les comptes créés avant la migration conservent leur discriminateur.

## Exemples

### Détecter un compte legacy

```bdfd
$if[$discriminator!=0]
  $title[Compte legacy]
  $description[
  **Tag complet :** $userTag
  **Discriminator :** $discriminator
  ]
  $color[#5865F2]
  $sendMessage[]
$else
  $title[Compte pompom]
  $description[
  **Nom :** $userName
  (Pas de discriminateur)
  ]
  $color[#57F287]
  $sendMessage[]
$endif
```

## Notes

- Le système de discriminateurs est **obsolète** — Discord ne les attribue plus aux nouveaux comptes.
- `$discriminator` retourne `"0"` pour les comptes pompom.
- Pour une identification fiable, utilisez toujours `$userID`.
