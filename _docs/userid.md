---
layout: doc
title: $userID
translation_key: docs
category: "Entity Info"
function_name: userID
syntax: $userID
description: Returns the ID Discord of the user qui triggered the command or l'interaction.
---

# $userID

The variable `$userID` retourne l'**ID Discord** (snowflake) of the user qui triggered l'exécution of the command or of l'interaction.

## Syntax

```
$userID
```

## Return Value

- **Type** : Snowflake (string numérique of 17-19 chiffres)
- Returns the ID unique of the user on Discord

## Behavior

- `$userID` ne prend **no argument**.
- Returns toudays the ID of the user qui a **interagi** with the bot (command, bouton, menu, modal, etc.).
- The ID est une string numérique permanent — il ne change never, contrairement to the nom of user.

## Examples

### Display the ID user

```bdfd
$title[Votre ID user]
$description[**ID :** `$userID`]
$color[#5865F2]
$sendMessage[]
```

### Use the ID in a condition

```bdfd
$if[$userID==123456789012345678]
  $sendMessage[Bonday administrator !]
$else
  $sendMessage[Bonday user !]
$endif
```

## Différence with $authorID

- `$userID` : the user qui triggered l'interaction
- `$authorID` : l'auteur of the message (in the cas of a message command)

Dans la plupart cas simples, les two sont identicals. Dans contexts avancés (workflows, interactions), `$userID` est recommended.

## Notes

- The ID Discord est un **snowflake** permanent and unique.
- Il is not possible of modifier or supprimer un ID Discord.
- Utilisez `$userID` en compareason with `$if[]` pour create commands réservées to certains users.
