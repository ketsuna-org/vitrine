---
layout: doc
title: "$kick — fonction BDScript"
category: "Modération"
category_key: "Moderation"
function_name: kick
syntax: $kick[userID;(reason)]
description: Expulse un utilisateur précis du serveur Discord.
locale: fr
lang: fr
content_language: fr
translation_key: doc-kick
permalink: /fr/docs/kick/
sidebar_context: docs_fr
---

# $kick

`$kick[userID;reason]` expulse le membre indiqué. Le bot a besoin de `Kick Members` et d'un rôle le plus élevé au-dessus du rôle le plus élevé de la cible. Le propriétaire du serveur ne peut pas être expulsé.

## Syntaxe

```text
$kick[userID;(reason)]
```

`userID` est l'ID Discord de la cible ; `reason` est facultatif (une raison vide n'envoie aucune raison au journal d'audit ; une raison de plus de 512 caractères lève une erreur). La forme sans argument `$kick` cible l'auteur de la commande. Une cible explicitement vide ne cible pas l'auteur : elle échoue avec `Missing or invalid user ID.`.

## Exemples

### Exemple de commande à préfixe

Configurez une commande à préfixe nommée `kick`. Pour `!kick @member`, `$mentioned[1]` sélectionne le premier utilisateur mentionné. Un ID brut saisi sans mention n'est pas une mention.

```bdfd
$nomention
$onlyPerms[kickmembers;You need Kick Members permission.]
$onlyBotPerms[kickmembers;The bot needs Kick Members permission.]
$var[target;$mentioned[1]]
$onlyIf[$var[target]!=;Usage: !kick @member]
$onlyIf[$var[target]!=$authorID;You cannot kick yourself.]
$onlyIf[$var[target]!=$serverOwner;The server owner cannot be kicked.]
$kick[$var[target];Rules violation]
Member kicked successfully.
```

Remplacez la raison fixe par une valeur choisie par votre commande. Pour une commande slash, utilisez son option d'utilisateur configurée à la place de `$mentioned[1]`.

### ID explicite

Remplacez l'ID d'exemple par un véritable ID de membre avant d'exécuter cet exemple.

```bdfd
$onlyPerms[kickmembers;You need Kick Members permission.]
$kick[123456789012345678;Rules violation]
Member kicked successfully.
```

La fonction ne renvoie aucun texte. Un ID de cible invalide lève `Missing or invalid user ID.`. Le bot est refusé (erreur) lorsqu'il n'a pas `Kick Members`, lorsque la cible est le propriétaire du serveur, ou lorsque le rôle le plus élevé de la cible est égal ou supérieur à celui du bot.
