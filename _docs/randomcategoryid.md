---
layout: doc
title: $randomCategoryID
translation_key: docs
category: "Math & Text"
function_name: randomCategoryID
syntax: $randomCategoryID
description: Retourne l'ID d'une catégorie aléatoire parmi toutes les catégories du serveur courant.
parameters: []
returns:
  - type: string (snowflake)
    description: L'ID Discord d'une catégorie choisie aléatoirement sur le serveur.
related:
  - $randomChannelID
  - $randomUserID
  - $categoryChannels[]
  - $channelID[]
examples:
  - description: Obtenir un ID de catégorie aléatoire
    code: $randomCategoryID
  - description: Mentionner une catégorie aléatoire
    code: "<#$randomCategoryID>"
  - description: Afficher le nom d'une catégorie aléatoire
    code: "$channelName[$randomCategoryID]"
---

# $randomCategoryID

La fonction `$randomCategoryID` retourne l'**identifiant Discord (snowflake)** d'une catégorie sélectionnée aléatoirement parmi toutes les catégories présentes sur le serveur où la commande est exécutée.

## Syntaxe

```
$randomCategoryID
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : String (snowflake Discord)
- L'ID d'une catégorie aléatoire du serveur courant.
- Retourne une chaîne vide si le serveur ne possède aucune catégorie.

## Comportement

- La fonction sélectionne une catégorie **aléatoirement** parmi toutes les catégories existantes sur le serveur.
- Le résultat change à chaque appel (pas déterministe).
- Seules les **catégories** (type GUILD_CATEGORY) sont concernées, pas les salons textuels ou vocaux.
- Si aucun salon de type catégorie n'existe sur le serveur, la fonction peut retourner une valeur vide.

## Exemples

### Mention d'une catégorie aléatoire

```bdfd
$title[🎲 Catégorie aléatoire]
$description[
Catégorie sélectionnée : <#$randomCategoryID>
**Nom :** $channelName[$randomCategoryID]
]
$color[#5865F2]
$sendMessage[]
```

### Attribution aléatoire

```bdfd
$title[📂 Attribution de catégorie]
$description[
Tu as été assigné à la catégorie **$channelName[$randomCategoryID]** !
]
$footer[ID : $randomCategoryID]
$color[#57F287]
$sendMessage[]
```

### Vérification d'existence

```bdfd
$let[cat;$randomCategoryID]
$if[$get[cat]==]
  $title[⚠️ Aucune catégorie]
  $description[Ce serveur ne possède aucune catégorie.]
  $color[#ED4245]
$else
  $title[✅ Catégorie trouvée]
  $description[Catégorie : **$channelName[$get[cat]]** (ID: `$get[cat]`)]
  $color[#57F287]
$endif
$sendMessage[]
```

## Notes

- Utilisez `$randomChannelID` pour obtenir un ID de salon aléatoire (tous types confondus).
- Pour lister toutes les catégories, utilisez `$categoryChannels[]`.
- Les IDs retournés sont des **snowflakes Discord** (chaînes numériques de 17-19 chiffres).
- La fonction est utile pour des jeux, des systèmes de hasard, ou des commandes de type "roulette".
