---
layout: doc
title: "$banID — fonction BDScript"
category: "Modération"
category_key: "Moderation"
function_name: banID
syntax: $banID / $banID[(reason)] / $banID[(reason);(userID)]
description: Bannit un ID d'utilisateur, la raison étant le premier argument. Tous les arguments sont facultatifs ; sans ID, le dernier argument du message est utilisé.
locale: fr
lang: fr
content_language: fr
translation_key: doc-banid
permalink: /fr/docs/banid/
sidebar_context: docs_fr
---

# $banID

`$banID[reason;userID]` prend la raison en premier et l'ID de la cible en second. Les deux arguments sont facultatifs (`$banID`, `$banID[reason]` et `$banID[reason;userID]` sont tous acceptés). Lorsque l'ID est omis ou vide, le dernier argument du message de commande est utilisé comme ID.

## Syntaxe

```text
$banID
$banID[reason]
$banID[reason;userID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `reason` | Facultatif. Raison du bannissement, 512 caractères au maximum (vide par défaut). |
| `userID` | Facultatif. ID de l'utilisateur à bannir (entier positif). S'il est vide, le dernier argument du message. Un ID manquant ou invalide lève « Missing or invalid user ID. ». |

## Valeur de retour

Renvoie une chaîne vide. La fonction ne supprime pas les anciens messages de l'utilisateur (0 jour de messages supprimés).

## Comportement

- Le bot a besoin de la permission Ban Members ; la cible ne peut pas être le propriétaire du serveur.
- Si la cible est un membre, le rôle le plus élevé du bot doit être au-dessus du rôle le plus élevé de la cible.
- Un utilisateur qui n'est pas membre du serveur peut être banni (la vérification de la hiérarchie est ignorée lorsque Discord indique que l'utilisateur n'est pas membre).
- Un refus ou un échec du service de modération est levé comme une erreur.

## Exemples

### ID explicite

Remplacez l'ID d'exemple par un véritable ID d'utilisateur avant d'exécuter cet exemple.

```bdfd
$onlyPerms[banmembers;You need Ban Members permission.]
$onlyBotPerms[banmembers;The bot needs Ban Members permission.]
$banID[Raid;123456789012345678]
Member banned for raiding.
```

### Exemple de commande à préfixe

Configurez une commande à préfixe nommée `ban`. Appelez-la ainsi : `!ban 123456789012345678`.

```bdfd
$onlyPerms[banmembers;You need Ban Members permission.]
$onlyBotPerms[banmembers;The bot needs Ban Members permission.]
$onlyIf[$message[1]!=;Usage: !ban userID]
$onlyIf[$message[1]!=$authorID;You cannot ban yourself.]
$onlyIf[$message[1]!=$serverOwner;The server owner cannot be banned.]
$banID[Moderation;$message[1]]
Member banned successfully.
```
