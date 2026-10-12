---
layout: doc
title: "$unTimeout — fonction BDScript"
category: "Modération"
category_key: "Moderation"
function_name: unTimeout
syntax: $unTimeout[(userID)]
description: Lève l'exclusion temporaire (timeout) d'un utilisateur avant son expiration.
locale: fr
lang: fr
content_language: fr
translation_key: doc-untimeout
permalink: /fr/docs/untimeout/
sidebar_context: docs_fr
---

# $unTimeout

La fonction `$unTimeout` **lève l'exclusion temporaire** (timeout) d'un utilisateur avant son expiration, ce qui lui rend la possibilité d'envoyer des messages et de parler en vocal. Le bot doit avoir la permission `ModerateMembers`.

## Syntaxe

```
$unTimeout[(userID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | Facultatif - L'ID de l'utilisateur à libérer de l'exclusion temporaire (doit être un nombre positif, sinon l'erreur `Missing or invalid user ID.` est levée). S'il est omis ou vide, chaque utilisateur mentionné dans le message est utilisé (chaque mention distincte est traitée) ; s'il n'y a pas non plus de mention, l'erreur `A user ID or user mention is required.` est levée. |

## Valeur de retour

Aucune (chaîne vide). Une erreur est levée si l'ID d'utilisateur est invalide, ou si le bot ne peut pas lever l'exclusion temporaire : le bot a besoin de la permission `ModerateMembers`, et l'opération est refusée lorsque la cible est le propriétaire du serveur, un administrateur, ou a un rôle le plus élevé égal ou supérieur à celui du bot.

## Exemples

### Levée simple

```bdfd
$unTimeout[$mentioned[1]]
$sendMessage[✅ <@$mentioned[1]> is no longer in timeout.]
```

### Levée conditionnelle

```bdfd
$if[$isTimedOut[$mentioned[1]]==true]
  $unTimeout[$mentioned[1]]
  $sendMessage[Timeout removed.]
$else
  $sendMessage[This user is not in timeout.]
$endif
```

### Commande de grâce

```bdfd
$unTimeout[$mentioned[1]]
$sendMessage[🙏 Pardon granted. <@$mentioned[1]> can participate again.]
```

## Remarques

- Le bot doit avoir la permission `ModerateMembers` (ou Administrateur). Le propriétaire du serveur, les administrateurs et les membres dont le rôle le plus élevé est égal ou supérieur au rôle le plus élevé du bot ne peuvent pas être ciblés.
- Utilisez `$isTimedOut` pour vérifier si un utilisateur est en exclusion temporaire avant d'appeler `$unTimeout`.
