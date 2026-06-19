---
layout: doc
title: $title[]
translation_key: docs
category: "Embed & Message"
function_name: title
syntax: $title[text;(embedIndex)]
description: Définit le titre d'un embed Discord. Le titre apparaît en haut de l'embed, en gras et avec une taille de police plus grande que la description.
---

# $title[]

La fonction `$title[]` définit le **titre** d'un embed Discord. Le titre est le texte le plus visible de l'embed, affiché en haut, en gras et avec une police plus grande.

## Syntaxe

```
$title[text;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Le texte du titre. Vous pouvez utiliser la syntaxe markdown Discord (gras, italique, souligné, etc.). |
| `embedIndex` | Optionnel. Index de l'embed à modifier (0 par défaut). Utilisez cet index pour construire plusieurs embeds dans un même message (maximum 10). |

## Valeur de retour

Cette fonction ne retourne rien : elle modifie la réponse en cours de construction. L'embed est envoyé via `$sendMessage[]`.

## Comportement

- `$title[]` est une **response mutation** : elle s'ajoute à la réponse en cours et sera envoyée lors du prochain `$sendMessage[]`.
- Si vous appelez `$title[]` plusieurs fois avant un `$sendMessage[]`, seul le dernier appel sera pris en compte pour l'embed concerné.
- L'ordre des appels est important : placez `$title[]` avant `$description[]`, `$color[]`, etc.

## Exemples

### Embed simple avec titre

```bdfd
$title[Bienvenue sur le serveur !]
$description[Merci de nous avoir rejoints 🎉]
$color[#5865F2]
$sendMessage[]
```

### Titre avec mise en forme markdown

```bdfd
$title[**Annonce importante** — *À lire absolument* 📢]
$description[Voici les dernières nouvelles du serveur.]
$color[#FF0000]
$sendMessage[]
```

### Multi-embed : titres différents pour chaque embed

```bdfd
$title[Premier embed;0]
$description[Contenu du premier embed;0]
$color[#5865F2;0]

$title[Deuxième embed;1]
$description[Contenu du deuxième embed;1]
$color[#57F287;1]

$sendMessage[]
```

## Notes

- La longueur maximale du titre est de **256 caractères**.
- Si le texte est vide, le titre ne sera pas affiché dans l'embed.
- Pour un embed sans titre, omettez simplement l'appel à `$title[]`.
