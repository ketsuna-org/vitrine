---
layout: doc
title: $memberID
translation_key: docs
category: "Entity Info"
function_name: memberID
syntax: $memberID
description: Retourne l'ID Discord de l'utilisateur membre. Équivalent à $userID dans la plupart des contextes, mais explicitement orienté "membre du serveur".
---

# $memberID

La variable `$memberID` retourne l'**ID Discord** du membre qui a déclenché la commande. Elle est fonctionnellement équivalente à `$userID` mais explicitement liée à la notion de "membre du serveur".

## Syntaxe

```
$memberID
```

## Valeur de retour

- **Type** : Snowflake (chaîne numérique de 17-19 chiffres)
- L'ID unique du membre sur Discord

## Comportement

- `$memberID` ne prend **aucun argument**.
- Dans la plupart des cas, `$memberID` et `$userID` retournent la même valeur.
- La distinction est conceptuelle : `$memberID` fait référence au **membre du serveur**, tandis que `$userID` fait référence à l'**utilisateur Discord**.

## Exemples

### Profil membre

```bdfd
$title[Membre : $memberNick]
$description[
**ID membre :** $memberID
**Permissions :** $memberPerms
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Dans BDFD, `$memberID` et `$userID` sont interchangeables pour l'utilisateur déclencheur.
- `$memberID` est utile pour la clarté sémantique dans le code (quand on travaille explicitement avec des membres).
- Pour l'unicité et la permanence, l'ID membre est identique à l'ID utilisateur.
