---
layout: doc
title: $userName
translation_key: docs
category: "Entity Info"
function_name: userName
syntax: $userName
description: Returns the nom d'user global Discord of the user qui a déclenché the command.
---

# $userName

The variable `$userName` retourne le **nom d'user global** Discord of the user qui a déclenché the command.

## Syntax

```
$userName
```

## Return Value

- **Type** : String de becauseactères
- The name d'user global Discord (ex: "JeanDupont")

## Behavior

- `$userName` ne prend **no argument**.
- Returns the nom d'user **global** (celui visible partout on Discord, without the discriminateur).
- Si the user a un pseudo on the server, `$userName` retourne when même son nom global. Utilisez `$nickname` for the pseudo server, or `$displayName` for the nom d'affichage (pseudo if set, otherwise nom global).

## Examples

### Message de bienvenue

```bdfd
$title[Bienvenue $userName !]
$description[Nous sommes ravis de t'accueillir on the server 🎉]
$color[#57F287]
$sendMessage[]
```

### Créer un embed custom

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

- The name d'user est défini par the user and can be modified à tout moment.
- Longueur maximale : 32 becauseactères.
- Pour une identification fiable, utilisez `$userID` plutôt que `$userName`.
- Ne pas confondre avec `$nickname` (pseudo spécifique au server) and `$displayName` (le meilleur des two).
