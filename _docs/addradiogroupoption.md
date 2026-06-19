---
layout: doc
title: $addRadioGroupOption[]
translation_key: docs
category: "Embed & Message"
function_name: addRadioGroupOption
syntax: $addRadioGroupOption[menuId;label;value;(description);(default)]
description: Adds an individual option to a group of radio buttons in a modal. The menuId can be omitted to target the last group created.
---

# $addRadioGroupOption[] — Option of Group Radio

`$addRadioGroupOption[]` ajoute une option to a group of radio buttons created with `$addModalRadioGroup[]`. A single option of the group can be selectionnée to la fois.

## Syntax

```
$addRadioGroupOption[menuId;label;value;(description);(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `menuId` | No | Last group | Identifier of the group radio parent. |
| `label` | Yes | — | Text displayed for the option. |
| `value` | Yes | — | Value retournée si selectionnée. |
| `description` | No | — | Description optionalle. |
| `default` | No | `no` | `yes` si selectionnée by default. |

## Return value

Ajoute the option to the group parent. The value selectionnée est accessible via `$input[menuId]`.

## Usage

### Group with options détaillées

```bdfd
$newModal[Abonnement;sub_modal]
$addModalRadioGroup[tier;Level of abonnement;yes]
$addRadioGroupOption[tier;Gratuit;free;Functionnalités of base;yes]
$addRadioGroupOption[tier;Pro;pro;Tout illimité, support prioritaire;no]
$addRadioGroupOption[tier;Enterprise;ent;Solution on mesure, SLA garanti;no]
```

### Without menuId explicite

```bdfd
$newModal[Feedback;feedback_modal]
$addModalRadioGroup[satisfaction;Satisfaction;yes]
$addRadioGroupOption[;Très satisfait;5;Excelslow !;no]
$addRadioGroupOption[;Satisfait;4;Bon;no]
$addRadioGroupOption[;Neutre;3;Moyen;no]
$addRadioGroupOption[;Insatisfait;2;Peut mieux faire;no]
$addRadioGroupOption[;Très insatisfait;1;À revoir;no]
```

### Option by default conditionnelle

```bdfd
$newModal[Langue;lang_modal]
$addModalRadioGroup[local;Langue of the interface;yes]
$addRadioGroupOption[;Français;fr;;yes]
$addRadioGroupOption[;English;en;;no]
```

## Notes

- A single option peut avoir `default` to `yes` in a même group radio.
- Si `menuId` est vide, the option target the last group created.
- La value retournée est le `value` of the option selectionnée (not the `label`).
- Maximum 25 options par group radio.
