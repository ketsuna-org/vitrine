---
layout: doc
title: "$unBan — fonction BDScript"
category: "Modération"
category_key: "Moderation"
function_name: unBan
syntax: $unBan
description: Débannit l'utilisateur banni dont le nom d'utilisateur correspond au texte du message. L'utilisateur pourra rejoindre à nouveau le serveur avec une nouvelle invitation.
locale: fr
lang: fr
content_language: fr
translation_key: doc-unban
permalink: /fr/docs/unban/
sidebar_context: docs_fr
---

# $unBan

La fonction `$unBan` permet de **débannir un utilisateur** du serveur, retrouvé par son **nom d'utilisateur** dans la liste des bannissements du serveur. Une fois débanni, l'utilisateur pourra rejoindre à nouveau le serveur avec une nouvelle invitation.

## Syntaxe

```
$unBan
```

## Paramètres

Cette fonction ne prend aucun argument (une forme avec crochets `$unBan[...]` est rejetée). Elle lit le texte du message qui a déclenché la commande (`message.content` ; pour une commande à préfixe, les arguments situés après le nom de la commande, joints par des espaces, c'est-à-dire ce que renvoie `$message`) et recherche un utilisateur banni dont le nom d'utilisateur lui est égal (sans tenir compte de la casse, dans toute la liste des bannissements). Pour débannir par ID, utilisez `$unBanID[]`.

## Valeur de retour

- **Type** : chaîne (vide)
- Une chaîne vide si le débannissement réussit.
- Une erreur est levée si le texte est vide (`A banned username is required.`), si aucun utilisateur banni ne correspond (`Banned user not found`), ou si le bot n'a pas la permission `Ban Members`.

## Comportement

- Le bot doit avoir la permission `Ban Members`.
- L'utilisateur doit figurer dans la liste des bannissements du serveur.
- La liste des bannissements est recherchée par nom d'utilisateur ; pour un ID, utilisez `$unBanID[]`.

## Exemples

### Débannissement simple

```bdfd
$unBan
$sendMessage[✅ **$message** was unbanned.]
```

### Débannissement avec confirmation

```bdfd
$unBan
$title[🔓 Unban]
$description[
**User:** $message
**Unbanned by:** $username
]
$color[#57F287]
$sendMessage[Unban done.]
```

### Commande avec un nom d'utilisateur

```bdfd
$if[$message==]
  $sendMessage[Please provide the username of a banned user.]
$else
  $unBan
  $sendMessage[✅ User **$message** unbanned.]
$endif
```

## Remarques

- L'utilisateur débanni ne rejoint pas automatiquement le serveur ; il doit utiliser une invitation.
- Fonctionne uniquement si l'utilisateur figure dans la liste des bannissements.
- Pour débannir par ID, utilisez `$unBanID[]`.
