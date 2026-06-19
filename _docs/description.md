---
layout: doc
title: $description[]
translation_key: docs
category: "Embed & Message"
function_name: description
syntax: $description[text;(embedIndex)]
description: Définit le corps principal (description) d'un embed Discord. C'est la zone de texte principale, située sous le titre.
---

# $description[]

La fonction `$description[]` définit le **corps principal** (description) d'un embed Discord. C'est la zone de texte principale de l'embed, affichée sous le titre.

## Syntaxe

```
$description[text;(embedIndex)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `text` | Le texte de la description. Supporte le markdown Discord, les sauts de ligne, les emojis et l'interpolation de fonctions/variables BDFD. |
| `embedIndex` | Optionnel. Index de l'embed à modifier (0 par défaut). |

## Valeur de retour

Cette fonction ne retourne rien : elle modifie la réponse en cours de construction. L'embed est envoyé via `$sendMessage[]`.

## Comportement

- `$description[]` est une **response mutation**.
- La description est le cœur du contenu de l'embed : c'est ici que vous placez l'essentiel de votre texte.
- Longueur maximale : **4096 caractères**.
- Si le texte est vide, la description ne sera pas affichée.

## Exemples

### Description simple

```bdfd
$title[Informations]
$description[Voici les informations demandées. Utilisez les boutons ci-dessous pour naviguer.]
$color[#5865F2]
$sendMessage[]
```

### Description multi-lignes avec markdown

```bdfd
$title[Règles du serveur]
$description[
**Règles du serveur :**
1. Respectez les autres membres
2. Pas de spam
3. Pas de contenu NSFW

*Merci de votre compréhension !*
]
$color[#ED4245]
$sendMessage[]
```

### Description avec variables dynamiques

```bdfd
$title[Profil]
$description[
**Nom :** $username
**ID :** $authorID
**Date d'inscription :** $creationDate[$authorID]
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- La description supporte le markdown complet de Discord : `**gras**`, `*italique*`, `__souligné__`, `~~barré~~`, listes, blocs de code, etc.
- Pour structurer des informations complexes, combinez `$description[]` avec `$addField[]`.
