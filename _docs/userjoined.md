---
layout: doc
title: $userJoined
translation_key: docs
category: "Entity Info"
function_name: userJoined
syntax: $userJoined
description: Retourne la date à laquelle l'utilisateur a rejoint le serveur Discord actuel.
---

# $userJoined

La variable `$userJoined` retourne la **date d'arrivée** de l'utilisateur sur le serveur Discord où la commande est exécutée.

## Syntaxe

```
$userJoined
```

## Valeur de retour

- **Type** : Date/chaîne de caractères
- Format : dépend du contexte (date lisible ou timestamp)

## Comportement

- `$userJoined` ne prend **aucun argument**.
- Retourne la date à laquelle l'utilisateur a rejoint le **serveur actuel**.
- Nécessite que l'utilisateur soit membre du serveur.

## Exemples

### Message de bienvenue

```bdfd
$title[Nouveau membre !]
$author[$userName;$userAvatar]
$description[
Bienvenue sur le serveur **$serverName** !
Tu as rejoint le **$userJoined**.
]
$color[#57F287]
$sendMessage[]
```

### Ancienneté du membre

```bdfd
$title[Votre ancienneté]
$description[
Vous êtes membre depuis le **$userJoined**.
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$userJoined` donne la date d'arrivée sur le **serveur**.
- Pour la date de création du compte Discord, utilisez `$userJoinedDiscord`.
- Utile pour les commandes d'information sur les membres et les messages de bienvenue.
