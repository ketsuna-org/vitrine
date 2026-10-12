---
layout: doc
title: "$ban — fonction BDScript"
category: "Modération"
category_key: "Moderation"
function_name: ban
syntax: $ban[(reason)]
description: Bannit le premier utilisateur mentionné, avec une raison facultative.
locale: fr
lang: fr
content_language: fr
translation_key: doc-ban
permalink: /fr/docs/ban/
sidebar_context: docs_fr
---

# $ban

`$ban` bannit le premier utilisateur mentionné dans le message déclencheur. Son argument est la raison facultative, et non un ID d'utilisateur.

## Syntaxe

```text
$ban
$ban[reason]
```

## Exemples

### Exemple de commande à préfixe

Configurez une commande à préfixe nommée `ban`, puis appelez `!ban @member`.

```bdfd
$nomention
$onlyPerms[banmembers;You need Ban Members permission.]
$onlyBotPerms[banmembers;The bot needs Ban Members permission.]
$onlyIf[$mentioned[1]!=;Usage: !ban @member]
$onlyIf[$mentioned[1]!=$authorID;You cannot ban yourself.]
$onlyIf[$mentioned[1]!=$serverOwner;The server owner cannot be banned.]
$ban[Spam]
Member banned for spam.
```

Sans mention dans le message, l'appel échoue avec « Missing or invalid user ID. » (il n'y a pas de repli sur l'auteur). La raison est limitée à 512 caractères. Le rôle le plus élevé du bot doit se situer au-dessus du rôle le plus élevé de la cible. Cette fonction ne renvoie aucun texte et ne supprime pas les anciens messages. La suppression des messages n'est pas un argument de cette fonction BDFD. Pour indiquer un ID explicitement, utilisez `$banID[reason;userID]`.
