---
layout: doc
title: $channelCount
translation_key: docs
category: "Entity Info"
function_name: channelCount
syntax: $channelCount[(categoryID)]
description: Retourne le nombre total de salons sur le serveur, ou le nombre de salons dans une catégorie spécifique.
---

# $channelCount

La fonction `$channelCount` retourne le **nombre de salons** sur le serveur Discord. En fournissant un ID de catégorie, elle peut aussi compter les salons d'une catégorie spécifique.

## Syntaxe

```
$channelCount[(categoryID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `categoryID` | Optionnel. L'ID d'une catégorie pour compter uniquement ses salons. Si omis, compte tous les salons du serveur. |

## Valeur de retour

| Type | Description |
|---|---|
| `integer` | Le nombre de salons correspondant au filtre. |

## Exemples

### Nombre total de salons

```bdfd
$sendMessage[Ce serveur compte $channelCount salons.]
```

### Salons dans une catégorie

```bdfd
$sendMessage[La catégorie contient $channelCount[123456789012345678] salons.]
```

### Comparaison

```bdfd
$if[$channelCount>50]
  $sendMessage[Ce serveur est immense ! ($channelCount salons)]
$else
  $sendMessage[Ce serveur a $channelCount salons.]
$endif
```

## Notes

- Compte tous les types de salons (textuels, vocaux, etc.), sauf les catégories elles-mêmes.
- Pour compter les catégories, utilisez `$categoryCount`.
- Les salons privés (non visibles par le bot) ne sont pas comptés.
