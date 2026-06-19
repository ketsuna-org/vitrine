---
layout: doc
title: $userJoinedDiscord
translation_key: docs
category: "Entity Info"
function_name: userJoinedDiscord
syntax: $userJoinedDiscord
description: Returns the date of création of the compte Discord of the user (date of inscription on the plateforme).
---

# $userJoinedDiscord

The variable `$userJoinedDiscord` retourne la **date of création** of the compte Discord of the user — it is-à-dire la date to laquelle il s'est inscrit on the plateforme Discord.

## Syntax

```
$userJoinedDiscord
```

## Return Value

- **Type** : Date/string of becauseactères
- La date of enregistrement of the compte on Discord

## Behavior

- `$userJoinedDiscord` ne prend **no argument**.
- La date est dérivée of the **snowflake** of the ID user (les firsts bits encodent un timestamp Epoch).
- Functionne pour tout user dont the ID est connu, même without membership server.

## Examples

### Display l'âge of the compte

```bdfd
$title[Informations of the compte]
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

- `$userJoinedDiscord` = date of création of the **compte** on Discord.
- `$userJoined` = date of arrivée on the **server**.
- The ID Discord (snowflake) encode la date of création, therefore cette information est toudays available.
