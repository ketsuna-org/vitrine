---
layout: doc
title: $randomMention[]
translation_key: docs
category: "Math & Text"
function_name: randomMention
syntax: $randomMention
description: Retourne la mention (format <@id>) d'un utilisateur aléatoire présent sur le serveur.
---

# $randomMention[]

La fonction `$randomMention[]` retourne la mention formatée d'un utilisateur aléatoire présent sur le serveur. La mention est au format `<@id>`, ce qui crée un ping pour l'utilisateur ciblé.

## Syntaxe

```
$randomMention
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

La mention formatée (`<@id>`) d'un utilisateur aléatoire du serveur.

## Différence avec les fonctions similaires

| Fonction | Retourne |
|----------|----------|
| `$randomMention` | `<@id>` — mention cliquable avec ping |
| `$randomUser` | `id` — ID brut |
| `$randomUserID` | `id` — ID brut |

## Exemples

### Mention directe

```bdfd
$randomMention, tu as été choisi aléatoirement !
```

### Annonce d'un gagnant

```bdfd
$title[🎊 Tirage au sort]
$description[Félicitations $randomMention ! Tu remportes le giveaway !]
$color[#FFD700]
$footer[Bonne chance à tous pour le prochain tirage]
```

### Tag aléatoire

```bdfd
Tag, c'est à ton tour $randomMention !
```

## Notes

- L'utilisateur reçoit une notification (ping) lorsque mentionné.
- Utilisez `$randomUserID[]` si vous ne souhaitez pas ping l'utilisateur.
