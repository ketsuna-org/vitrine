---
layout: doc
title: $userJoined
translation_key: docs
category: "Entity Info"
function_name: userJoined
syntax: $userJoined
description: Returns the date à laquelle the user a rejoint the server Discord current.
---

# $userJoined

The variable `$userJoined` retourne la **date d'arrivée** of the user on the server Discord où the command est executed.

## Syntax

```
$userJoined
```

## Return Value

- **Type** : Date/string de becauseactères
- Format : dépend du context (date lisible or timestamp)

## Behavior

- `$userJoined` ne prend **no argument**.
- Returns the date à laquelle the user a rejoint le **server current**.
- Requires que the user soit member of the server.

## Examples

### Message de bienvenue

```bdfd
$title[New member !]
$author[$userName;$userAvatar]
$description[
Bienvenue on the server **$serverName** !
Tu as rejoint le **$userJoined**.
]
$color[#57F287]
$sendMessage[]
```

### Oldneté du member

```bdfd
$title[Votre oldneté]
$description[
Vous êtes member dethen le **$userJoined**.
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$userJoined` donne la date d'arrivée sur le **server**.
- Pour la date de création du compte Discord, utilisez `$userJoinedDiscord`.
- Utile for the commands d'information sur les members and les messages de bienvenue.
