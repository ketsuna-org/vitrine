---
layout: doc
title: $nickname
translation_key: docs
category: "Entity Info"
function_name: nickname
syntax: $nickname
description: Returns the pseudo (surnom) of the user on the server current. Returns ae string vide si no pseudo n'est défini.
---

# $nickname

The variable `$nickname` retourne le **pseudo (surnom)** of the user on the server current. Contrairement to `$displayName`, elle retourne une string vide si the user n'a pas of pseudo custom.

## Syntax

```
$nickname
```

## Return Value

- **Type** : String of becauseactères
- Le pseudo server if set, otherwise une **string vide**

## Behavior

- `$nickname` ne prend **no argument**.
- Returns aiquement le pseudo **specific to the server**.
- Si the user utilise son nom global (pas of pseudo), retourne `""` (string vide).
- La longueur maximale of un pseudo est of 32 becauseactères.

## Examples

### Détecter la présence of un pseudo

```bdfd
$if[$nickname!=]
  $sendMessage[Bonday $nickname ! (pseudo: $nickname, nom: $userName)]
$else
  $sendMessage[Bonday $userName !]
$endif
```

### Display les information of nom

```bdfd
$title[Noms of $userName]
$description[
**Nom global :** $userName
**Pseudo server :** $nickname
**Nom of affichage :** $displayName
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Ne pas confondre `$nickname` (pseudo server only) with `$displayName` (pseudo or nom global).
- Pour l'affichage in thes messages, `$displayName` est generally préférable because il ne sera never vide.
- Utile for the commands où vous voulez explicitement savoir si the user a un pseudo or non.
