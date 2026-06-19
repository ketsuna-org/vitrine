---
layout: doc
title: $displayName
translation_key: docs
category: "Entity Info"
function_name: displayName
syntax: $displayName
description: Returns the name of affichage of the user — le pseudo of the server s'il existe, otherwise the name of user global.
---

# $displayName

The variable `$displayName` returns the **nom of affichage** of the user on the server. This is the name the most pertinent in the context of the server : le pseudo (nickname) s'it is défini, otherwise the name of user global.

## Syntax

```
$displayName
```

## Return value

- **Type** : String of becauseactères
- Priorité : pseudo server (`$nickname`) > nom of user global (`$userName`)

## Behavior

- `$displayName` ne prend **no argument**.
- If the user a un **pseudo** (surnom) on the server, `$displayName` le retourne.
- Sinon, returns the **nom of user global**.
- This is the name que les autres members voient on the server.

## Examples

### Message of bienvenue

```bdfd
$title[Bienvenue $displayName !]
$description[
Nous sommes ravis of t'accueillir on **$serverName** !
]
$thumbnail[$userAvatar]
$color[#57F287]
$sendMessage[]
```

### Profil user

```bdfd
$author[$displayName;$userAvatar]
$title[Profil user]
$description[
**Nom of affichage :** $displayName
**Nom global :** $userName
**Pseudo server :** $nickname
**ID :** $userID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$displayName` est le choix recommended to display the name of a user in thes messages of the bot.
- Il reflète ce que les members voient réellement on the server.
- Différences : `$userName` (nom global only), `$nickname` (pseudo server only, can be vide), `$displayName` (le meilleur two).
