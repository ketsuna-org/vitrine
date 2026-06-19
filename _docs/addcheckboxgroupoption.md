---
layout: doc
title: $addCheckboxGroupOption[]
translation_key: docs
category: "Embed & Message"
function_name: addCheckboxGroupOption
syntax: $addCheckboxGroupOption[menuId;label;value;(description);(default)]
description: Adds an option individuelle à a group de checkboxes in a modal. The menuId can be omis to target le last groupe created.
---

# $addCheckboxGroupOption[] — Option de Groupe Checkbox

`$addCheckboxGroupOption[]` ajoute une option à a group de checkboxes created avec `$addModalCheckboxGroup[]`. Each option apparaît comme une checkbox distincte avec its own label.

## Syntax

```
$addCheckboxGroupOption[menuId;label;value;(description);(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `menuId` | No | Last group | Identifier of the group parent. |
| `label` | Yes | — | Text displayed for this option. |
| `value` | Yes | — | Value retournée when the option est cochée. |
| `description` | No | — | Text descriptif optional. |
| `default` | No | `no` | `yes` si cochée by default. |

## Return value

Ajoute the option au groupe parent. Pas de value de return directe.

## Usage

### With explicit menuId

```bdfd
$newModal[Config;config_modal]
$addModalCheckboxGroup[notifications;Notifications;no]
$addCheckboxGroupOption[notifications;Messages privates;dm;Recevoir les notifications of messages privates;yes]
$addCheckboxGroupOption[notifications;Mentions;mentions;Notifications de @mention;yes]
$addCheckboxGroupOption[notifications;Annonces;announce;Annonces of the server;no]
```

### Without menuId (last groupe)

```bdfd
$newModal[Préférences;pref_modal]
$addModalCheckboxGroup[themes;Thèmes visuels;no]
$addCheckboxGroupOption[;Minimal;minimal;Design épuré;no]
$addCheckboxGroupOption[;Coloré;colorful;Design vibrant;yes]
$addCheckboxGroupOption[;Sombre;dark;Mode sombre;yes]
```

### Multiple distinct groups

```bdfd
$newModal[Sondage complete;full_survey]
$addModalCheckboxGroup[platform;Plateformes;yes]
$addCheckboxGroupOption[platform;Discord;discord;;yes]
$addCheckboxGroupOption[platform;Twitter;twitter;;no]

$addModalCheckboxGroup[content;Type de contenu;no]
$addCheckboxGroupOption[content;Articles;articles]
$addCheckboxGroupOption[content;Vidéos;videos]
$addCheckboxGroupOption[content;Podcasts;podcasts]
```

## Notes

- Si `menuId` est omis (string vide), the option is addede au last groupe created.
- Maximum 25 options par groupe.
- Les values of options cochées are retrieved via `$input[menuId]`, separated by commas.
