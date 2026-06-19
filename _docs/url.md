---
layout: doc
title: $url
translation_key: docs
category: "Context & Commands"
function_name: url
syntax: $url
description: Returns the URL of the page web currentlement loadede in the context of the bot. Utile in thes interactions web or les dashboards.
---
# $url

The function `$url` retourne l'**URL of the context web current** in thequel the bot s'exécute.

## Syntax

```
$url
```

## Parameters

Aucun.

## Return Value

- **Type** : String
- The URL of the context courant (page web, dashboard, etc.).

## Behavior

- Returns the URL of the page si the bot est executed in a context web.
- Peut retourner une string vide hors context web.

## Examples

### Display the URL courante

```bdfd
$sendMessage[URL currentle : $url]
```

### Vérifier une page specific

```bdfd
$if[$checkContains[$url;/dashboard]==true]
  $sendMessage[Vous êtes on the dashboard.]
$else
  $sendMessage[Vous êtes on : $url]
$endif
```

## Notes

- Context-déduring : returns nothing in thes commands Discord classiques.
- Utile for the applications web-based and les dashboards BDFD.
