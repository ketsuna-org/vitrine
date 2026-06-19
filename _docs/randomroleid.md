---
layout: doc
title: $randomRoleID[]
translation_key: docs
category: "Math & Text"
function_name: randomRoleID
syntax: $randomRoleID
description: Retourne l'ID d'un rôle aléatoire présent sur le serveur.
---

# $randomRoleID[]

La fonction `$randomRoleID[]` retourne l'ID Discord d'un rôle aléatoire présent sur le serveur.

## Syntaxe

```
$randomRoleID
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

L'ID Discord (snowflake) d'un rôle aléatoire du serveur, sous forme de chaîne de caractères.

## Exemples

### Obtenir un ID de rôle aléatoire

```bdfd
ID du rôle aléatoire : $randomRoleID
```

### Mentionner un rôle aléatoire

```bdfd
Rôle aléatoire : <@&$randomRoleID>
```

### Attribuer un rôle aléatoire

```bdfd
$giveRole[$authorID;$randomRoleID]
```

## Notes

- Le rôle est choisi parmi tous les rôles du serveur, y compris le rôle `@everyone`.
- Le bot doit avoir la permission de gérer les rôles pour utiliser `$giveRole[]`.
