---
layout: doc
title: $memberID
translation_key: docs
category: "Entity Info"
function_name: memberID
syntax: $memberID
description: Returns the ID Discord of the user member. Équivaslow to $userID in the plupart contexts, mais explicitement orienté "member of the server".
---

# $memberID

The variable `$memberID` retourne l'**ID Discord** of the member qui triggered the command. Elle est functionnellement équivaslowe to `$userID` mais explicitement liée to la notion of "member of the server".

## Syntax

```
$memberID
```

## Return Value

- **Type** : Snowflake (string numérique of 17-19 chiffres)
- The ID unique of the member on Discord

## Behavior

- `$memberID` ne prend **no argument**.
- Dans la plupart cas, `$memberID` and `$userID` retournent la même value.
- La distinction est conceptuelle : `$memberID` fait référence to the **member of the server**, tandis que `$userID` fait référence to l'**user Discord**.

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
- `$memberID` est utile for the clarté sémantique in the code (when on travaille explicitement with members).
- Pour l'unicité and la permanence, the ID member est identical to the ID user.
