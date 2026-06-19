---
layout: doc
title: $addCheckboxGroupOption[]
translation_key: docs
category: "Embed & Message"
function_name: addCheckboxGroupOption
syntax: $addCheckboxGroupOption[menuId;label;value;(description);(default)]
description: Adds an individual option to a checkbox group in a modal. The menuId can be omitted to target the last group created.
---

# $addCheckboxGroupOption[] — Option of Group Checkbox

`$addCheckboxGroupOption[]` ajoute une option to a checkbox group created with `$addModalCheckboxGroup[]`. Each option apparaît like a checkbox distincte with its own label.

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

Ajoute the option to the group parent. Pas of value of return directe.

## Usage

### With explicit menuId

```bdfd
$newModal[Config;config_modal]
$addModalCheckboxGroup[notifications;Notifications;no]
$addCheckboxGroupOption[notifications;Messages privates;dm;Recevoir les notifications of messages privates;yes]
$addCheckboxGroupOption[notifications;Mentions;mentions;Notifications of @mention;yes]
$addCheckboxGroupOption[notifications;Annonces;announce;Annonces of the server;no]
```

### Without menuId (last group)

```bdfd
$newModal[Préférences;pref_modal]
$addModalCheckboxGroup[themes;Thèmes visuals;no]
$addCheckboxGroupOption[;Minimal;minimal;Design épuré;no]
$addCheckboxGroupOption[;Colored;colorful;Design vibrant;yes]
$addCheckboxGroupOption[;Sombre;dark;Mode sombre;yes]
```

### Multiple distinct groups

```bdfd
$newModal[Sondage complete;full_survey]
$addModalCheckboxGroup[platform;Plateformes;yes]
$addCheckboxGroupOption[platform;Discord;discord;;yes]
$addCheckboxGroupOption[platform;Twitter;twitter;;no]

$addModalCheckboxGroup[content;Type of contenu;no]
$addCheckboxGroupOption[content;Articles;articles]
$addCheckboxGroupOption[content;Vidéos;videos]
$addCheckboxGroupOption[content;Podcasts;podcasts]
```

## Notes

- Si `menuId` est omitted (string vide), the option is addede to the last group created.
- Maximum 25 options par group.
- Les values of options cochées are retrieved via `$input[menuId]`, separated by commas.
