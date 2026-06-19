---
layout: doc
title: $serverSplash[]
translation_key: docs
category: "Entity Info"
function_name: serverSplash
syntax: $serverSplash
description: Returns the URL of the image of fond of invite (splash) of the server Discord. Available only for the servers partenaires or vérifiés with a level of boost suffisant.
---

# $serverSplash[] — Image of Invite of the Server

`$serverSplash[]` retourne the URL of the image of fond qui s'displays on the page of invite Discord of the server (when a user clique on a link of invite).

> **Prérequired** : This functionnalité est réservée to the servers partenaires Discord or vérifiés, with a level of boost suffisant.

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
$sendMessage[Splash of invite : $serverSplash]
$else
$sendMessage[Ce server n'a pas of splash of invite.]
$endif
```

### Embed with splash

```bdfd
$title[$serverName — Rejoignez-nous !]
$description[$serverDescription]
$image[$serverSplash]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Page of invite custome

```bdfd
$title[🌟 Invite — $serverName]
$description[Vous êtes invité to rejoindre $serverName !]
$image[$serverSplash]
$addField[Link of invite;discord.gg/$serverVanityURL;yes]
$addField[Members;$membersCount;yes]
$color[#9B59B6]
$sendEmbedMessage
```

## Notes

- L'image splash est distincte of la banner : elle apparaît specifically on the page of invite.
- Réservée to the servers partenaires or vérifiés (badge Partenaire or Vérifié).
- Si the server is not éligible, the function retourne une string vide.
- Dimensions recommendedes : 1920x1080px (ratio 16:9).
