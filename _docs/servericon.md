---
layout: doc
title: $serverIcon[]
translation_key: docs
category: "Entity Info"
function_name: serverIcon
syntax: $serverIcon
description: Returns the URL of the icon of the server Discord.
---

# $serverIcon[] — Icon of the Server

`$serverIcon[]` retourne the URL of the icon of the server Discord. Si the server n'a pas of icon custome, the function retourne une string vide.

## Syntax

```
$serverIcon
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The URL directe of l'icon of the server (format PNG or WEBP), or une string vide si noe icon n'est définie.

## Utilisation

### Icon in a embed

```bdfd
$title[$serverName]
$description[Voici l'icon of notre server]
$image[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Thumbnail in a message of bienvenue

```bdfd
$title[Bienvenue !]
$thumbnail[$serverIcon]
$description[Bienvenue on $serverName, $username !]
$addField[Members;$membersCount;yes]
$color[#2ECC71]
$sendEmbedMessage
```

### Vérifier si the server a une icon

```bdfd
$if[$serverIcon==]
$sendMessage[Ce server n'a pas of icon custome.]
$else
$sendMessage[Icon of the server : $serverIcon]
$endif
```

### Footer with icon

```bdfd
$footer[$serverName;$serverIcon]
$description[Message officiel of the server]
$color[#F1C40F]
$sendEmbedMessage
```

## Notes

- `$serverIcon[]` est un alias of `$guildIcon[]`.
- The URL retournée est une URL Discord CDN directe, accessible publicment.
- Si the server n'a pas of icon, the function retourne une string vide (``).
- The URL can be utilisée in `$image[]`, `$thumbnail[]`, `$footer[]` or `$author[text;;$serverIcon]`.
