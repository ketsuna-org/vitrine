---
layout: doc
title: $addRadioGroupOption[]
translation_key: docs
category: "Embed & Message"
function_name: addRadioGroupOption
syntax: $addRadioGroupOption[menuId;label;value;(description);(default)]
description: Adds an option individuelle à a group de radio buttons in a modal. The menuId can be omis to target le last groupe created.
---

# $addRadioGroupOption[] — Option de Groupe Radio

`$addRadioGroupOption[]` ajoute une option à a group de radio buttons created avec `$addModalRadioGroup[]`. A single option of the group can be selectionnée à la fois.

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

Ajoute the option au groupe parent. The value selectionnée est accessible via `$input[menuId]`.

## Usage

### Groupe avec options détaillées

```bdfd
$newModal[Abonnement;sub_modal]
$addModalRadioGroup[tier;Level d'abonnement;yes]
$addRadioGroupOption[tier;Gratuit;free;Functionnalités de base;yes]
$addRadioGroupOption[tier;Pro;pro;Tout illimité, support prioritaire;no]
$addRadioGroupOption[tier;Enterprise;ent;Solution sur mesure, SLA garanti;no]
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

- A single option peut avoir `default` à `yes` dans un même groupe radio.
- Si `menuId` est vide, the option cible le last groupe created.
- La value retournée est le `value` of the option selectionnée (not the `label`).
- Maximum 25 options par groupe radio.
