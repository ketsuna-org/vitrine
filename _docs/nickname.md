---
layout: doc
title: $nickname
translation_key: docs
category: "Entity Info"
function_name: nickname
syntax: $nickname
description: Retourne le pseudo (surnom) de l'utilisateur sur le serveur actuel. Retourne une chaîne vide si aucun pseudo n'est défini.
---

# $nickname

La variable `$nickname` retourne le **pseudo (surnom)** de l'utilisateur sur le serveur actuel. Contrairement à `$displayName`, elle retourne une chaîne vide si l'utilisateur n'a pas de pseudo personnalisé.

## Syntaxe

```
$nickname
```

## Valeur de retour

- **Type** : Chaîne de caractères
- Le pseudo serveur si défini, sinon une **chaîne vide**

## Comportement

- `$nickname` ne prend **aucun argument**.
- Retourne uniquement le pseudo **spécifique au serveur**.
- Si l'utilisateur utilise son nom global (pas de pseudo), retourne `""` (chaîne vide).
- La longueur maximale d'un pseudo est de 32 caractères.

## Exemples

### Détecter la présence d'un pseudo

```bdfd
$if[$nickname!=]
  $sendMessage[Bonjour $nickname ! (pseudo: $nickname, nom: $userName)]
$else
  $sendMessage[Bonjour $userName !]
$endif
```

### Afficher les informations de nom

```bdfd
$title[Noms de $userName]
$description[
**Nom global :** $userName
**Pseudo serveur :** $nickname
**Nom d'affichage :** $displayName
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Ne pas confondre `$nickname` (pseudo serveur uniquement) avec `$displayName` (pseudo ou nom global).
- Pour l'affichage dans les messages, `$displayName` est généralement préférable car il ne sera jamais vide.
- Utile pour les commandes où vous voulez explicitement savoir si l'utilisateur a un pseudo ou non.
