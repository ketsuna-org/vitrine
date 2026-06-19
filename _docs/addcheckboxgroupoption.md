---
layout: doc
title: $addCheckboxGroupOption[]
translation_key: docs
category: "Embed & Message"
function_name: addCheckboxGroupOption
syntax: $addCheckboxGroupOption[menuId;label;value;(description);(default)]
description: Ajoute une option individuelle à un groupe de cases à cocher dans un modal. Le menuId peut être omis pour cibler le dernier groupe créé.
---

# $addCheckboxGroupOption[] — Option de Groupe Checkbox

`$addCheckboxGroupOption[]` ajoute une option à un groupe de cases à cocher créé avec `$addModalCheckboxGroup[]`. Chaque option apparaît comme une case à cocher distincte avec son propre label.

## Syntaxe

```
$addCheckboxGroupOption[menuId;label;value;(description);(default)]
```

## Paramètres

| Paramètre | Obligatoire | Défaut | Description |
|-----------|-------------|--------|-------------|
| `menuId` | Non | Dernier groupe | Identifiant du groupe parent. |
| `label` | Oui | — | Texte affiché pour cette option. |
| `value` | Oui | — | Valeur retournée quand l'option est cochée. |
| `description` | Non | — | Texte descriptif optionnel. |
| `default` | Non | `no` | `yes` si cochée par défaut. |

## Valeur de retour

Ajoute l'option au groupe parent. Pas de valeur de retour directe.

## Utilisation

### Avec menuId explicite

```bdfd
$newModal[Config;config_modal]
$addModalCheckboxGroup[notifications;Notifications;no]
$addCheckboxGroupOption[notifications;Messages privés;dm;Recevoir les notifications de messages privés;yes]
$addCheckboxGroupOption[notifications;Mentions;mentions;Notifications de @mention;yes]
$addCheckboxGroupOption[notifications;Annonces;announce;Annonces du serveur;no]
```

### Sans menuId (dernier groupe)

```bdfd
$newModal[Préférences;pref_modal]
$addModalCheckboxGroup[themes;Thèmes visuels;no]
$addCheckboxGroupOption[;Minimal;minimal;Design épuré;no]
$addCheckboxGroupOption[;Coloré;colorful;Design vibrant;yes]
$addCheckboxGroupOption[;Sombre;dark;Mode sombre;yes]
```

### Plusieurs groupes distincts

```bdfd
$newModal[Sondage complet;full_survey]
$addModalCheckboxGroup[platform;Plateformes;yes]
$addCheckboxGroupOption[platform;Discord;discord;;yes]
$addCheckboxGroupOption[platform;Twitter;twitter;;no]

$addModalCheckboxGroup[content;Type de contenu;no]
$addCheckboxGroupOption[content;Articles;articles]
$addCheckboxGroupOption[content;Vidéos;videos]
$addCheckboxGroupOption[content;Podcasts;podcasts]
```

## Notes

- Si `menuId` est omis (chaîne vide), l'option est ajoutée au dernier groupe créé.
- Maximum 25 options par groupe.
- Les valeurs des options cochées sont récupérées via `$input[menuId]`, séparées par des virgules.
