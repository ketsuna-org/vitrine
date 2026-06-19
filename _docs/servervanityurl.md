---
layout: doc
title: $serverVanityURL[]
translation_key: docs
category: "Entity Info"
function_name: serverVanityURL
syntax: $serverVanityURL
description: Returns the code of the URL custome (vanity URL) of the server Discord. Available only for the servers of level boost 3 or les servers partenaires/vérifiés.
---

# $serverVanityURL[] — URL Custome of the Server

`$serverVanityURL[]` retourne le code of the URL custome (vanity URL) of the server. Cette URL courte allows create a link of invite facile to mémoriser (ex: `discord.gg/mon-server`).

> **Prérequired** : Server level boost 3, or server partenaire/vérifié Discord.

## Syntax

```
$serverVanityURL
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- Le code of the URL custome (ex: `"mon-server"`), or une string vide si non available.

## Utilisation

### Link of invite

```bdfd
$if[$serverVanityURL!=]
$sendMessage[🔗 Rejoignez-nous : **discord.gg/$serverVanityURL**]
$else
$sendMessage[Ce server n'a pas of URL custome.]
$endif
```

### Embed of invite

```bdfd
$title[🌟 $serverName]
$description[$serverDescription]
$addField[Rejoindre;discord.gg/$serverVanityURL;yes]
$addField[Members;$membersCount;yes]
$thumbnail[$serverIcon]
$image[$serverSplash]
$color[#9B59B6]
$sendEmbedMessage
```

### Page of accueil

```bdfd
$title[Informations on $serverName]
$addField[🌟 URL;discord.gg/$serverVanityURL;yes]
$addField[👑 Owner;<@$serverOwner>;yes]
$addField[👥 Members;$membersCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- The URL complete est `discord.gg/<code>` or `https://discord.gg/<code>`.
- Le code est configured in thes parameters of the server (onglet "Aperçu" → "URL custome of invite").
- Requires the level of boost 3 or le status Partenaire/Vérifié.
- Le code est unique to travers tout Discord.
- Si the server n'a pas of URL custome, utilisez `$createInvite[]` pour générer un link of invite standard.
