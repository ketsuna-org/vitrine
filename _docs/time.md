---
layout: doc
title: $time[]
translation_key: docs
category: "Date & Time"
function_name: time
syntax: $time
description: Retourne l'heure actuelle au format HH:MM:SS. Résolu au runtime.
parameters: []
returns:
  - type: string
    description: L'heure actuelle formatée en HH:MM:SS.
related:
  - $hour[]
  - $minute[]
  - $second[]
  - $date[]
examples:
  - description: Afficher l'heure formatée
    code: $time
  - description: Intégrer dans un message
    code: |
      $title[🕐 Heure actuelle]
      $description[Il est **$time**]
---

# $time[]

La fonction `$time[]` retourne l'heure actuelle au format `HH:MM:SS` (heures:minutes:secondes).

> **Important :** Cette fonction utilise l'identifiant spécial `((time))` qui est résolu au **runtime**, c'est-à-dire à chaque exécution de la commande.

## Syntaxe

```
$time
```

> **Note :** Cette fonction ne prend aucun paramètre.

## Valeur de retour

Une chaîne de caractères au format `HH:MM:SS` (ex: `14:30:05`).

## Exemples

### Heure simple

```bdfd
Il est $time.
```

### Embed avec l'heure

```bdfd
$title[🕐 Horloge du serveur]
$description[Heure actuelle : **$time**]
$footer[Format 24h]
```

### Horodatage complet

```bdfd
📅 $date à $time
```

## Notes

- `$time[]` est l'équivalent de `$hour:$minute:$second` en une seule fonction.
- L'heure est basée sur le fuseau horaire du serveur exécutant le bot.
- Pour un timestamp Unix, utilisez `$getTimestamp[]`.
