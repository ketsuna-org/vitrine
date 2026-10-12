---
layout: doc
title: "$takeRole — fonction BDScript"
category: "Modération"
function_name: takeRole
syntax: $takeRole[userID;roleID] or $takeRole[roleID]
description: "Retire un rôle à un utilisateur sur le serveur."
locale: fr
lang: fr
content_language: fr
translation_key: doc-takerole
permalink: /fr/docs/takerole/
sidebar_context: docs_fr
category_key: "Moderation"
---

# $takeRole

La fonction `$takeRole` **retire un rôle** à un utilisateur sur le serveur Discord. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$takeRole[userID;roleID]
$takeRole[roleID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | Optionnel. L'ID de l'utilisateur cible. Si un seul argument est fourni, il est lu comme l'ID du rôle et le rôle est retiré aux utilisateurs mentionnés dans le message ; une erreur est levée s'il n'y a aucune mention (l'auteur n'est jamais utilisé comme valeur de repli). |
| `roleID` | L'ID du rôle à retirer (un nombre positif). Obligatoire. |

## Valeur de retour

Aucune (chaîne vide). Une erreur est levée si l'ID de l'utilisateur ou du rôle est invalide.

## Exemples

### Retrait simple

```bdfd
$takeRole[$mentioned[1];$roleID[Muted]]
$sendMessage[🔊 <@$mentioned[1]> is no longer muted!]
```

### Retrait après vérification

```bdfd
$if[$checkContains[$userRoles[$mentioned[1]];$roleID[Muted]]==true]
  $takeRole[$mentioned[1];$roleID[Muted]]
  $sendMessage[Muted role removed.]
$else
  $sendMessage[This user does not have the Muted role.]
$endif
```

### Commande de retrait avec confirmation

```bdfd
$takeRole[$mentioned[1];$roleID[$message[2]]]
$sendMessage[✅ Role removed from <@$mentioned[1]>.]
```

## Remarques

- Le bot doit avoir la permission `ManageRoles`.
- Le bot doit avoir `Manage Roles` ; le rôle doit être situé sous le rôle le plus élevé du bot, et `@everyone` ainsi que les rôles gérés (bot, intégration, booster) ne peuvent pas être retirés.
- Pour retirer plusieurs rôles, utilisez `$takeRoles`.
