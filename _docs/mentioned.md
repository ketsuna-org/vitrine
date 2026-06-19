---
layout: doc
title: $mentioned
translation_key: docs
category: "Entity Info"
function_name: mentioned
syntax: $mentioned
description: Returns the ID of the first user mentionné in the message. Équivaslow to the first élément of $mentions.
---

# $mentioned

The variable `$mentioned` retourne l'**ID of the first user mentionné** in the command message.

## Syntax

```
$mentioned
```

## Return Value

- **Type** : Snowflake (string numérique) or string vide
- ID of the first user mentionné (`<@ID>`)
- String vide si noe mention user n'est présente

## Behavior

- `$mentioned` ne prend **no argument**.
- Returns aiquement la **first** mention user.
- Pour obtenir all mentions, utilisez `$mentions`.

## Examples

### Agir on the user mentionné

```bdfd
$if[$mentioned!=]
  $title[Informations on <@$mentioned>]
  $description[
  **ID :** $mentioned
  **Nom :** $username[$mentioned]
  ]
  $thumbnail[$userAvatar[$mentioned]]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Vous devez mentionner un user.]
$endif
```

### Kick of the first mentionné

```bdfd
$if[$mentioned!=]
  $if[$checkContains[$userPerms;KickMembers]==true]
    $kick[$mentioned]
    $sendMessage[<@$mentioned> was expulsé.]
  $else
    $sendMessage[Permission refusée.]
  $endif
$else
  $sendMessage[Mentionnez the user to expulser.]
$endif
```

## Notes

- `$mentioned` est pratique for the commands qui n'attendent qu'a single cible.
- Si several users sont mentionnés, seul le first est retourné.
- Utilisez `$userExists[$mentioned]` pour validr que the user mentionné existe.
- Ne détecte pas les mentions `@everyone` or `@here`.
