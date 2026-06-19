---
layout: doc
title: $addModalCheckboxGroup[]
translation_key: docs
category: "Embed & Message"
function_name: addModalCheckboxGroup
syntax: $addModalCheckboxGroup[customId;label;(required)]
description: Crée a group de checkboxes in a modal. The options individuthey are ajoutées avec $addCheckboxGroupOption[].
---

# $addModalCheckboxGroup[] — Groupe de Cases à Cocher

`$addModalCheckboxGroup[]` crée a container pour a group de checkboxes in a modal. The options sont then ajoutées avec `$addCheckboxGroupOption[]`. The user peut cocher multiple options simultaneously.

## Syntax

```
$addModalCheckboxGroup[customId;label;(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the group. |
| `label` | Yes | — | Label descriptive above of the group. |
| `required` | No | `yes` | `yes` if a selection is required. |

## Return value

Initialise a group de checkboxes. The values cochées sont accessibles via `$input[customId]` sous forme de list separatede par des virgules.

## Usage

### Interests group

```bdfd
$newModal[Profil;profile_modal]
$addModalTextInput[username;Pseudo;short;;;yes;3;32]
$addModalCheckboxGroup[hobbies;Loisirs;no]
$addCheckboxGroupOption[;Lecture;reading;Livres and romans]
$addCheckboxGroupOption[;Cinéma;movies;Films and séries]
$addCheckboxGroupOption[;Cuisine;cooking;Art culinaire]
$addCheckboxGroupOption[;Voyages;travel;Découvrir le monde]
```

### Required group

```bdfd
$newModal[Sondage;sondage_modal]
$addModalCheckboxGroup[features;Functionnalités souhaitées;yes]
$addCheckboxGroupOption[;Notifications;notif]
$addCheckboxGroupOption[;Mode sombre;darkmode]
$addCheckboxGroupOption[;Export datas;export]
```

### Récupération of values

```bdfd
$onInteraction[profile_submit]
$var[hobbies;$input[hobbies]]
$sendMessage[Loisirs selectionnés : $var[hobbies]]
$endInteraction
```

## Notes

- Les options sont ajoutées avec `$addCheckboxGroupOption[]` où le `menuId` can be omis to target le last groupe created.
- La value retournée est a string contenant les `value` of options cochées, separated by commas.
- Maximum 25 options par groupe (limit Discord).
