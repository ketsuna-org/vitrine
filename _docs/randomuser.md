---
layout: doc
title: $randomUser[]
translation_key: docs
category: "Math & Text"
function_name: randomUser
syntax: $randomUser
description: Retourne l'ID ou la mention d'un utilisateur aléatoire présent sur le serveur.
parameters: []
returns:
  - type: string
    description: L'ID d'un utilisateur aléatoire du serveur.
related:
  - $randomUserID[]
  - $randomMention[]
examples:
  - description: Mentionner un utilisateur aléatoire
    code: <@$randomUser>
  - description: Obtenir l'ID d'un utilisateur aléatoire
    code: $randomUser
  - description: Utiliser dans un giveaway
    code: |
      $title[🎉 Giveaway !]
      $description[Le gagnant est : <@$randomUser> !]
---

# $randomUser[]

La fonction `$randomUser[]` retourne l'ID d'un utilisateur aléatoire présent sur le serveur où la commande est exécutée.

## Syntaxe

```
$randomUser
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

L'ID Discord (snowflake) d'un utilisateur aléatoire du serveur, sous forme de chaîne de caractères.

## Exemples

### Mentionner un utilisateur aléatoire

```bdfd
Utilisateur aléatoire : <@$randomUser>
```

### Annoncer un gagnant

```bdfd
$title[🎉 Tirage au sort]
$description[Félicitations <@$randomUser> ! Tu as gagné !]
$color[#FFD700]
```

### Obtenir l'ID uniquement

```bdfd
ID aléatoire : $randomUser
```

## Notes

- L'utilisateur sélectionné fait partie des membres du serveur.
- Le bot doit avoir accès à la liste des membres pour que cette fonction fonctionne correctement.
- Pour obtenir uniquement l'ID sans formatage, utilisez `$randomUserID[]`.
- Pour une mention directe (avec le format `<@id>`), utilisez `$randomMention[]`.
