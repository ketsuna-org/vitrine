---
layout: doc
title: $serverSplash[]
translation_key: docs
category: "Entity Info"
function_name: serverSplash
syntax: $serverSplash
description: Returns the URL of the image de fond d'invite (splash) of the server Discord. Available only for the servers partenaires or vérifiés with a level de boost suffisant.
---

# $serverSplash[] — Image d'Invite du Server

`$serverSplash[]` retourne the URL of the image de fond qui s'displays sur la page d'invite Discord of the server (when a user clique sur un link d'invite).

> **Prérequired** : This functionnalité est réservée aux servers partenaires Discord or vérifiés, with a level de boost suffisant.

## Syntax

```
$serverSplash
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The URL of the image splash, or une string vide si non available.

## Utilisation

### Affichage simple

```bdfd
$if[$serverSplash!=]
$sendMessage[Splash d'invite : $serverSplash]
$else
$sendMessage[Ce server n'a pas de splash d'invite.]
$endif
```

### Embed avec splash

```bdfd
$title[$serverName — Rejoignez-nous !]
$description[$serverDescription]
$image[$serverSplash]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Page d'invite custome

```bdfd
$title[🌟 Invite — $serverName]
$description[Vous êtes invité à rejoindre $serverName !]
$image[$serverSplash]
$addField[Link d'invite;discord.gg/$serverVanityURL;yes]
$addField[Members;$membersCount;yes]
$color[#9B59B6]
$sendEmbedMessage
```

## Notes

- L'image splash est distincte de la banner : elle apparaît specifically sur la page d'invite.
- Réservée aux servers partenaires or vérifiés (badge Partenaire or Vérifié).
- Si the server is not éligible, the function retourne une string vide.
- Dimensions recommendedes : 1920x1080px (ratio 16:9).
