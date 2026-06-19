---
layout: doc
title: $memberID
translation_key: docs
category: "Entity Info"
function_name: memberID
syntax: $memberID
description: Returns the ID Discord of the user member. Équivaslow à $userID in the plupart des contexts, mais explicitement orienté "member of the server".
---

# $memberID

The variable `$memberID` retourne l'**ID Discord** du member qui a déclenché the command. Elle est functionnellement équivaslowe à `$userID` mais explicitement liée à la notion de "member of the server".

## Syntax

```
$memberID
```

## Return Value

- **Type** : Snowflake (string numérique de 17-19 chiffres)
- The ID unique du member on Discord

## Behavior

- `$memberID` ne prend **no argument**.
- Dans la plupart des cas, `$memberID` and `$userID` retournent la même value.
- La distinction est conceptuelle : `$memberID` fait référence au **member of the server**, tandis que `$userID` fait référence à l'**user Discord**.

## Examples

### Profil member

```bdfd
$title[Member : $memberNick]
$description[
**ID member :** $memberID
**Permissions :** $memberPerms
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Dans BDFD, `$memberID` and `$userID` sont interchangeables for the user déclencheur.
- `$memberID` est utile for the clarté sémantique in the code (when on travaille explicitement avec des members).
- Pour l'unicité and la permanence, the ID member est identical à the ID user.
