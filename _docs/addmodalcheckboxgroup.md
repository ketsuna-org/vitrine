---
layout: doc
title: $addModalCheckboxGroup[]
translation_key: docs
category: "Embed & Message"
function_name: addModalCheckboxGroup
syntax: $addModalCheckboxGroup[customId;label;(required)]
description: Crée a checkbox group in a modal. The options individuthey are ajoutées with $addCheckboxGroupOption[].
---

# $addModalCheckboxGroup[] — Group of Cases to Cocher

`$addModalCheckboxGroup[]` crée a container pour a checkbox group in a modal. The options sont then ajoutées with `$addCheckboxGroupOption[]`. The user peut cocher multiple options simultaneously.

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

Initialise a checkbox group. The values cochées sont accessibles via `$input[customId]` sous forme of list separatede par virgules.

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

- Les options sont ajoutées with `$addCheckboxGroupOption[]` où le `menuId` can be omitted to target the last group created.
- La value retournée est a string contenant les `value` of options cochées, separated by commas.
- Maximum 25 options par group (limit Discord).
