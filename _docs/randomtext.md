---
layout: doc
title: $randomText[]
translation_key: docs
category: "Math & Text"
function_name: randomText
syntax: $randomText[option1;option2;...]
description: Choisit et retourne aléatoirement une option parmi une liste d'options textuelles fournies.
---

# $randomText[]

La fonction `$randomText[]` choisit aléatoirement une option parmi une liste d'options textuelles fournies et retourne cette option.

## Syntaxe

```
$randomText[option1;option2;...]
```

## Paramètres

| Paramètre | Description |
|-----------|-------------|
| `option1;option2;...` | Liste d'options textuelles séparées par des points-virgules (`;`). |

## Valeur de retour

Une chaîne de caractères correspondant à l'une des options de la liste, choisie aléatoirement.

## Comportement

- Chaque option a une probabilité égale d'être sélectionnée.
- Les options sont séparées par des points-virgules (`;`).
- Tous les caractères sont autorisés dans les options, mais attention au point-virgule qui sert de séparateur.

## Exemples

### Pile ou Face

```bdfd
🪙 La pièce tombe sur : **$randomText[Pile;Face]** !
```

### Choix de couleur aléatoire

```bdfd
$title[Couleur du jour]
$description[La couleur du jour est : **$randomText[Rouge;Bleu;Vert;Jaune;Violet;Orange;Rose]**]
$color[$randomText[#FF0000;#0000FF;#00FF00;#FFFF00;#800080;#FFA500;#FF69B4]]
```

### Message d'accueil aléatoire

```bdfd
$randomText[
  Bienvenue $username sur le serveur ! 🎉;
  Hey $username, ravi de te voir ! 👋;
  $username vient de nous rejoindre ! 🥳;
  Un nouvel aventurier, $username, est arrivé ! ⚔️
]
```

## Notes

- Pour générer un nombre aléatoire, utilisez `$random[]`.
- Pour générer une chaîne alphanumérique aléatoire, utilisez `$randomString[]`.
