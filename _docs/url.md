---
layout: doc
title: $url
translation_key: docs
category: "Context & Commands"
function_name: url
syntax: $url
description: Retourne l'URL de la page web actuellement chargée dans le contexte du bot. Utile dans les interactions web ou les dashboards.
parameters: []
returns:
  - type: string
    description: L'URL courante du contexte web.
related:
  - $customID
  - $input
  - $serverURL
examples:
  - description: Afficher l'URL courante
    code: "$sendMessage[URL actuelle : $url]"
---
# $url

La fonction `$url` retourne l'**URL du contexte web actuel** dans lequel le bot s'exécute.

## Syntaxe

```
$url
```

## Paramètres

Aucun.

## Valeur de retour

- **Type** : Chaîne
- L'URL du contexte courant (page web, dashboard, etc.).

## Comportement

- Retourne l'URL de la page si le bot est exécuté dans un contexte web.
- Peut retourner une chaîne vide hors contexte web.

## Exemples

### Afficher l'URL courante

```bdfd
$sendMessage[URL actuelle : $url]
```

### Vérifier une page spécifique

```bdfd
$if[$checkContains[$url;/dashboard]==true]
  $sendMessage[Vous êtes sur le dashboard.]
$else
  $sendMessage[Vous êtes sur : $url]
$endif
```

## Notes

- Contexte-dépendant : ne retourne rien dans les commandes Discord classiques.
- Utile pour les applications web-based et les dashboards BDFD.
