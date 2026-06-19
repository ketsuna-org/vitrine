---
layout: doc
title: $getStringSelectValues
translation_key: docs
category: "Entity Info"
function_name: getStringSelectValues
syntax: $getStringSelectValues[(separator)]
description: Récupère toutes les valeurs des options sélectionnées dans un menu de sélection de chaînes à choix multiples.
---

# $getStringSelectValues

La fonction `$getStringSelectValues[]` permet de **récupérer toutes les valeurs** des options choisies par l'utilisateur dans un menu de sélection de chaînes à choix multiples.

## Syntaxe

```
$getStringSelectValues[(separator)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `separator` | Optionnel - Le séparateur entre chaque valeur. Par défaut `, ` (virgule + espace). |

## Valeur de retour

- **Type** : String
- La liste de toutes les valeurs sélectionnées, séparées par le délimiteur.
- Chaîne vide si aucune option n'a été sélectionnée.

## Comportement

- Utilisé avec un menu de chaînes configuré avec `maxValues > 1`.
- Retourne les valeurs (pas les labels) des options choisies.
- Permet de traiter plusieurs choix en une seule interaction.

## Exemples

### Traitement de plusieurs choix

```bdfd
$onInteraction[menu]
$let[vals;$getStringSelectValues[,]]

Vous avez sélectionné :
$textSplit[$vals;,]
  - Option : $splitText[$index]
$endTextSplit

$sendMessage[]
```

### Boucle conditionnelle

```bdfd
$onInteraction[menu]
$let[choices;$getStringSelectValues[,]]

$textSplit[$choices;,]
  $if[$splitText[$index]==notif]
    $sendDM[$authorID;🔔 Notifications activées !]
  $elseif[$splitText[$index]==news]
    $sendDM[$authorID;📰 Newsletter activée !]
  $endif
$endTextSplit
```

## Notes

- Pour une sélection unique, utilisez `$getStringSelectValue[]`.
- Le séparateur peut être personnalisé pour faciliter le parsing.
- Les valeurs sont définies dans `$addStringSelectMenu[]`.
