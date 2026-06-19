---
layout: doc
title: $randomUserID[]
translation_key: docs
category: "Math & Text"
function_name: randomUserID
syntax: $randomUserID
description: Retourne l'ID d'un utilisateur aléatoire présent sur le serveur.
---

# $randomUserID[]

La fonction `$randomUserID[]` retourne l'ID Discord (snowflake) d'un utilisateur aléatoire présent sur le serveur.

## Syntaxe

```
$randomUserID
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

L'ID Discord (snowflake) d'un utilisateur aléatoire du serveur, sous forme de chaîne de caractères.

## Différence avec `$randomUser[]`

`$randomUser[]` et `$randomUserID[]` retournent la même valeur : l'ID utilisateur. La distinction est purement sémantique. Utilisez `$randomUserID[]` lorsque vous souhaitez explicitement manipuler l'ID.

## Exemples

### Obtenir un ID aléatoire

```bdfd
ID utilisateur aléatoire : $randomUserID
```

### Stocker dans une variable

```bdfd
$let[winner;$randomUserID]
Le gagnant est : <@$get[winner]>
```

## Notes

- L'utilisateur est choisi parmi les membres du serveur.
- Pour mentionner directement l'utilisateur, utilisez `$randomMention[]`.
