---
layout: doc
title: $displayName
translation_key: docs
category: "Entity Info"
function_name: displayName
syntax: $displayName
description: Retourne le nom d'affichage de l'utilisateur — le pseudo du serveur s'il existe, sinon le nom d'utilisateur global.
parameters: []
returns:
  - type: string
    description: Le nom d'affichage de l'utilisateur.
related:
  - $userName
  - $nickname
  - $userTag
examples:
  - description: Obtenir le nom d'affichage
    code: $displayName
  - description: Message de bienvenue avec nom d'affichage
    code: |
      $title[Bienvenue $displayName !]
      $description[Heureux de t'accueillir !]
      $color[#57F287]
      $sendMessage[]
---

# $displayName

La variable `$displayName` retourne le **nom d'affichage** de l'utilisateur sur le serveur. C'est le nom le plus pertinent dans le contexte du serveur : le pseudo (nickname) s'il est défini, sinon le nom d'utilisateur global.

## Syntaxe

```
$displayName
```

## Valeur de retour

- **Type** : Chaîne de caractères
- Priorité : pseudo serveur (`$nickname`) > nom d'utilisateur global (`$userName`)

## Comportement

- `$displayName` ne prend **aucun argument**.
- Si l'utilisateur a un **pseudo** (surnom) sur le serveur, `$displayName` le retourne.
- Sinon, retourne le **nom d'utilisateur global**.
- C'est le nom que les autres membres voient sur le serveur.

## Exemples

### Message de bienvenue

```bdfd
$title[Bienvenue $displayName !]
$description[
Nous sommes ravis de t'accueillir sur **$serverName** !
]
$thumbnail[$userAvatar]
$color[#57F287]
$sendMessage[]
```

### Profil utilisateur

```bdfd
$author[$displayName;$userAvatar]
$title[Profil utilisateur]
$description[
**Nom d'affichage :** $displayName
**Nom global :** $userName
**Pseudo serveur :** $nickname
**ID :** $userID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$displayName` est le choix recommandé pour afficher le nom d'un utilisateur dans les messages du bot.
- Il reflète ce que les membres voient réellement sur le serveur.
- Différences : `$userName` (nom global uniquement), `$nickname` (pseudo serveur uniquement, peut être vide), `$displayName` (le meilleur des deux).
