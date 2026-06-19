---
layout: doc
title: $randomChannelID[]
translation_key: docs
category: "Math & Text"
function_name: randomChannelID
syntax: $randomChannelID
description: Retourne l'ID d'un salon aléatoire présent sur le serveur.
parameters: []
returns:
  - type: string
    description: L'ID Discord d'un salon aléatoire du serveur.
related:
  - $randomUserID[]
  - $randomRoleID[]
  - $randomGuildID[]
examples:
  - description: Obtenir un ID de salon aléatoire
    code: $randomChannelID
  - description: Mentionner un salon aléatoire
    code: <#$randomChannelID>
---

# $randomChannelID[]

La fonction `$randomChannelID[]` retourne l'ID Discord d'un salon aléatoire présent sur le serveur où la commande est exécutée.

## Syntaxe

```
$randomChannelID
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

L'ID Discord (snowflake) d'un salon aléatoire du serveur, sous forme de chaîne de caractères.

## Exemples

### Obtenir un ID de salon aléatoire

```bdfd
ID du salon aléatoire : $randomChannelID
```

### Mentionner un salon aléatoire

```bdfd
Salon aléatoire : <#$randomChannelID>
```

### Utiliser comme salon de destination

```bdfd
$sendMessage[$randomChannelID;Message envoyé dans un salon aléatoire !]
```

## Notes

- Le salon est choisi parmi tous les salons accessibles au bot sur le serveur.
- Pour les salons textuels, vous pouvez utiliser l'ID avec les fonctions d'envoi de message.
