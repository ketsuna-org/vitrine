---
layout: doc
title: $userID
translation_key: docs
category: "Entity Info"
function_name: userID
syntax: $userID
description: Returns the ID Discord of the user qui a déclenché the command or l'interaction.
---

# $userID

The variable `$userID` retourne l'**ID Discord** (snowflake) of the user qui a déclenché l'exécution of the command or de l'interaction.

## Syntax

```
$userID
```

## Return Value

- **Type** : Snowflake (string numérique de 17-19 chiffres)
- Returns the ID unique of the user on Discord

## Behavior

- `$userID` ne prend **no argument**.
- Returns toudays the ID of the user qui a **interagi** with the bot (command, bouton, menu, modal, etc.).
- The ID est une string numérique permanent — il ne change never, contrairement au nom d'user.

## Examples

### Afficher the ID user

```bdfd
$title[Votre ID user]
$description[**ID :** `$userID`]
$color[#5865F2]
$sendMessage[]
```

### Utiliser the ID dans une condition

```bdfd
$if[$userID==123456789012345678]
  $sendMessage[Bonday administrator !]
$else
  $sendMessage[Bonday user !]
$endif
```

## Différence avec $authorID

- `$userID` : the user qui a déclenché l'interaction
- `$authorID` : l'auteur of the message (in the cas of a message command)

Dans la plupart des cas simples, les two sont identicals. Dans des contexts avancés (workflows, interactions), `$userID` est recommended.

## Notes

- The ID Discord est un **snowflake** permanent and unique.
- Il is not possible de modifier or supprimer un ID Discord.
- Utilisez `$userID` en compareason avec `$if[]` pour créer des commands réservées à certains users.
