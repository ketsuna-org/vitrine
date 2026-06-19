---
layout: doc
title: $userName
translation_key: docs
category: "Entity Info"
function_name: userName
syntax: $userName
description: Retourne le nom d'utilisateur global Discord de l'utilisateur qui a déclenché la commande.
---

# $userName

La variable `$userName` retourne le **nom d'utilisateur global** Discord de l'utilisateur qui a déclenché la commande.

## Syntaxe

```
$userName
```

## Valeur de retour

- **Type** : Chaîne de caractères
- Le nom d'utilisateur global Discord (ex: "JeanDupont")

## Comportement

- `$userName` ne prend **aucun argument**.
- Retourne le nom d'utilisateur **global** (celui visible partout sur Discord, sans le discriminateur).
- Si l'utilisateur a un pseudo sur le serveur, `$userName` retourne quand même son nom global. Utilisez `$nickname` pour le pseudo serveur, ou `$displayName` pour le nom d'affichage (pseudo si défini, sinon nom global).

## Exemples

### Message de bienvenue

```bdfd
$title[Bienvenue $userName !]
$description[Nous sommes ravis de t'accueillir sur le serveur 🎉]
$color[#57F287]
$sendMessage[]
```

### Créer un embed personnalisé

```bdfd
$author[$userName;$userAvatar]
$title[Profil utilisateur]
$description[
**Nom :** $userName
**ID :** $userID
**Tag :** $userTag
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Le nom d'utilisateur est défini par l'utilisateur et peut être modifié à tout moment.
- Longueur maximale : 32 caractères.
- Pour une identification fiable, utilisez `$userID` plutôt que `$userName`.
- Ne pas confondre avec `$nickname` (pseudo spécifique au serveur) et `$displayName` (le meilleur des deux).
