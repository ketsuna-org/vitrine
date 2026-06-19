---
layout: doc
title: $userJoinedDiscord
translation_key: docs
category: "Entity Info"
function_name: userJoinedDiscord
syntax: $userJoinedDiscord
description: Returns the date de création du compte Discord of the user (date d'inscription sur la plateforme).
---

# $userJoinedDiscord

The variable `$userJoinedDiscord` retourne la **date de création** du compte Discord of the user — it is-à-dire la date à laquelle il s'est inscrit sur la plateforme Discord.

## Syntax

```
$userJoinedDiscord
```

## Return Value

- **Type** : Date/string de becauseactères
- La date d'enregistrement du compte on Discord

## Behavior

- `$userJoinedDiscord` ne prend **no argument**.
- La date est dérivée du **snowflake** de the ID user (les firsts bits encodent un timestamp Epoch).
- Functionne pour tout user dont the ID est connu, même without membership server.

## Examples

### Afficher l'âge du compte

```bdfd
$title[Informations du compte]
$description[
**Nom :** $userName
**Counts created le :** $userJoinedDiscord
**Member dethen le :** $userJoined
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier un compte récent

```bdfd
$if[$userJoinedDiscord < 01/01/2024]
  $sendMessage[Counts created before 2024.]
$else
  $sendMessage[Counts récent.]
$endif
```

## Notes

- `$userJoinedDiscord` = date de création du **compte** on Discord.
- `$userJoined` = date d'arrivée sur le **server**.
- The ID Discord (snowflake) encode la date de création, therefore cette information est toudays available.
