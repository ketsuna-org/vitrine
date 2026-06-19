---
layout: doc
title: $addModalRadioGroup[]
translation_key: docs
category: "Embed & Message"
function_name: addModalRadioGroup
syntax: $addModalRadioGroup[customId;label;(required)]
description: Crée a group of radio buttons in a modal. The user ne peut selectionner qu'a single option to la fois. The options sont ajoutées with $addRadioGroupOption[].
---

# $addModalRadioGroup[] — Group of Buttons Radio

`$addModalRadioGroup[]` crée a container of radio buttons in a modal. Contrairement to the checkboxes, a single choix can be selectionné parmi les options of the group.

## Syntax

```
$addModalRadioGroup[customId;label;(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the group. |
| `label` | Yes | — | Label above of the group. |
| `required` | No | `yes` | `yes` si required. |

## Return value

Initialise a group radio. The value of the option selectionnée est accessible via `$input[customId]`.

## Usage

### Group radio simple

```bdfd
$newModal[Inscription;signup_modal]
$addModalTextInput[name;Nom;short;;;yes;2;50]
$addModalRadioGroup[gender;Genre;yes]
$addRadioGroupOption[gender;Masculin;male]
$addRadioGroupOption[gender;Féminin;female]
$addRadioGroupOption[gender;Non-binaire;nb]
```

### Group with option by default

```bdfd
$newModal[Préférences;pref_modal]
$addModalRadioGroup[lang;Langue préférée;yes]
$addRadioGroupOption[;Français;fr;;yes]
$addRadioGroupOption[;English;en]
$addRadioGroupOption[;Español;es]
```

### Récupération of la selection

```bdfd
$onInteraction[signup_submit]
$var[gender;$input[gender]]
$if[$var[gender]==male]
  $sendMessage[Bienvenue on the server !]
$elseif[$var[gender]==female]
  $sendMessage[Bienvenue on the server !]
$endif
$endInteraction
```

## Différences Radio vs Checkbox

| Radio Group | Checkbox Group |
|-------------|---------------|
| A single option selectionnable | Multiple options selectionnables |
| Returns a single value | Returns a list of values |
| Idéal pour choix excludedsifs | Idéal pour selections multiple |

## Notes

- Les options sont ajoutées with `$addRadioGroupOption[]`.
- Comme for checkbox groups, le `menuId` can be omitted in `$addRadioGroupOption[]` to target the last group created.
- Maximum 25 options par group radio.
