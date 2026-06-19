---
layout: doc
title: $userName
translation_key: docs
category: "Entity Info"
function_name: userName
syntax: $userName
description: Returns the nom of user global Discord of the user qui triggered the command.
---

# $userName

The variable `$userName` retourne le **nom of user global** Discord of the user qui triggered the command.

## Syntax

```
$userName
```

## Return Value

- **Type** : String of becauseactères
- The name of user global Discord (ex: "JeanDupont")

## Behavior

- `$userName` ne prend **no argument**.
- Returns the nom of user **global** (celui visible partout on Discord, without the discriminateur).
- Si the user a un pseudo on the server, `$userName` retourne when même son nom global. Utilisez `$nickname` for the pseudo server, or `$displayName` for the nom of affichage (pseudo if set, otherwise nom global).

## Examples

### Message of bienvenue

```bdfd
$title[Bienvenue $userName !]
$description[Nous sommes ravis of t'accueillir on the server 🎉]
$color[#57F287]
$sendMessage[]
```

### Create a embed custom

```bdfd
$author[$userName;$userAvatar]
$title[Profil user]
$description[
**Nom :** $userName
**ID :** $userID
**Tag :** $userTag
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- The name of user est défini par the user and can be modified to tout moment.
- Longueur maximale : 32 becauseactères.
- Pour une identification fiable, utilisez `$userID` plutôt que `$userName`.
- Ne pas confondre with `$nickname` (pseudo specific to the server) and `$displayName` (le meilleur two).
