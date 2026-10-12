---
layout: doc
title: "$slowmode — fonction BDScript"
category: "Infos sur les entités"
function_name: slowmode
syntax: $slowmode[channelID;time]
description: "Définit le délai du mode lent d'un salon Discord (fonction d'écriture). Pour lire la valeur actuelle, utilisez $getSlowmode."
locale: fr
lang: fr
content_language: fr
translation_key: doc-slowmode
permalink: /fr/docs/slowmode/
sidebar_context: docs_fr
category_key: "Entity Info"
---

# $slowmode

La fonction `$slowmode` **définit le délai du mode lent** d'un salon Discord. C'est un **setter** : elle ne retourne pas la valeur actuelle (utilisez pour cela [`$getSlowmode`](/docs/getslowmode/) (en anglais)).

## Syntaxe

```
$slowmode[channelID;time]
```

La fonction requiert exactement 2 arguments.

## Paramètres

| Paramètre | Description |
|---|---|
| `channelID` | L'ID du salon cible. Obligatoire ; un ID invalide lève « Invalid channel ID. ». |
| `time` | Le nouveau délai. Obligatoire. Un nombre simple est lu en secondes ; une durée BDFD (`10s`, `5m`, `1h`, `1m30s`...) est également acceptée. `0` désactive le mode lent. |

## Valeur de retour

Cette fonction ne retourne aucune valeur.

## Plage autorisée

Le délai doit être compris entre `0` et 6 heures (`21600` secondes). Toute autre valeur, ou une durée illisible, lève l'erreur « Slowmode must be between 0 and 6 hours. ».

## Exemples

### Définir un mode lent de 10 secondes

```bdfd
$slowmode[$channelID;10s]
$sendMessage[Slowmode set to 10 seconds.]
```

### Désactiver le mode lent

```bdfd
$slowmode[$channelID;0]
$sendMessage[Slowmode disabled.]
```

### Mode lent sur un autre salon

```bdfd
$slowmode[123456789012345678;5m]
```

## Remarques

- `$slowmode` est un **setter** : utilisez `$getSlowmode` pour lire le mode lent actuel.
- Le délai est stocké en secondes entières.
