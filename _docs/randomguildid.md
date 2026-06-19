---
layout: doc
title: $randomGuildID[]
translation_key: docs
category: "Math & Text"
function_name: randomGuildID
syntax: $randomGuildID
description: Retourne l'ID d'un serveur aléatoire parmi les serveurs où le bot est présent.
parameters: []
returns:
  - type: string
    description: L'ID Discord d'un serveur aléatoire où le bot est présent.
related:
  - $randomUserID[]
  - $randomChannelID[]
  - $randomRoleID[]
examples:
  - description: Obtenir un ID de serveur aléatoire
    code: $randomGuildID
  - description: Afficher le nombre de membres d'un serveur aléatoire
    code: $membersCount[$randomGuildID]
---

# $randomGuildID[]

La fonction `$randomGuildID[]` retourne l'ID Discord d'un serveur aléatoire parmi tous les serveurs où le bot est présent.

## Syntaxe

```
$randomGuildID
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

L'ID Discord (snowflake) d'un serveur aléatoire, sous forme de chaîne de caractères.

## Exemples

### Obtenir un ID de serveur aléatoire

```bdfd
ID du serveur aléatoire : $randomGuildID
```

### Obtenir des informations sur un serveur aléatoire

```bdfd
$title[Serveur aléatoire]
$description[Nom : $serverName[$randomGuildID]]
$addField[Membres :;$membersCount[$randomGuildID]]
```

## Notes

- Le serveur est choisi parmi tous les serveurs où le bot est présent.
- Chaque serveur a une probabilité égale d'être sélectionné.
