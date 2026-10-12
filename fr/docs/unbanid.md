---
layout: doc
title: "$unBanID — fonction BDScript"
category: "Modération"
category_key: "Moderation"
function_name: unBanID
syntax: $unBanID[(userID)]
description: Débannit un utilisateur du serveur à partir de son ID. Si aucun ID n'est donné, le dernier mot du message est utilisé.
locale: fr
lang: fr
content_language: fr
translation_key: doc-unbanid
permalink: /fr/docs/unbanid/
sidebar_context: docs_fr
---

# $unBanID

La fonction `$unBanID[]` permet de **débannir un utilisateur par son ID**. Contrairement à `$unBan`, qui recherche par nom d'utilisateur, elle travaille à partir de l'ID brut.

## Syntaxe

```
$unBanID[(userID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | Facultatif - L'ID Discord de l'utilisateur à débannir. S'il est omis, le dernier mot du message est utilisé (vide s'il n'y en a pas). S'il est vide ou n'est pas un nombre positif, l'erreur `Missing or invalid user ID.` est levée. |

## Valeur de retour

- **Type** : chaîne (vide)
- Chaîne vide si le débannissement réussit.
- Une erreur est levée en cas d'échec (ID invalide, permissions insuffisantes, ou échec de l'appel à Discord, par exemple parce que l'utilisateur n'est pas banni).

## Comportement

- Contrairement à `$unBan`, qui recherche le nom d'utilisateur dans la liste des bannissements, elle débannit l'ID donné.
- Le bot doit avoir la permission `Ban Members`.
- Il n'y a pas d'argument de raison : le débannissement est effectué sans raison dans le journal d'audit.

## Exemples

### Débannir à partir d'un ID

```bdfd
$unBanID[$message[1]]
$sendMessage[✅ **$message[1]** was unbanned.]
```

### Débannissement programmé

```bdfd
$var[target;$noMentionMessage]
$if[$isBanned[$var[target]]==true]
  $unBanID[$var[target]]
  $channelSendMessage[$channelID[mod-logs];User **$var[target]** was unbanned (end of ban duration).]
$endif
```

## Remarques

- Utilisez `$unBan` pour débannir par nom d'utilisateur.
- Utile pour les scripts internes où seul l'ID est connu.
