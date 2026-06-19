---
layout: doc
title: $addModalSelect[]
translation_key: docs
category: "Embed & Message"
function_name: addModalSelect
syntax: $addModalSelect[customId;label;(placeholder);(required)]
description: Ajoute a menu déroulant (select/dropdown) to a modal Discord. The options sont ajoutées with $addSelectMenuOption[].
---

# $addModalSelect[] — Menu Déroulant in a Modal

`$addModalSelect[]` ajoute a menu déroulant (select menu) to a modal. The options of the menu sont définies with `$addSelectMenuOption[]` after this call.

## Syntax

```
$addModalSelect[customId;label;(placeholder);(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier to retrieve the value after soumission. |
| `label` | Yes | — | Text displayed above of the menu. |
| `placeholder` | No | — | Text indicatif in the menu non selectionné. |
| `required` | No | `yes` | `yes` si required, `no` otherwise. |

## Return value

Ajoute le composant Select to the modal in progress. The value selectionnée est accessible via `$input[customId]` in the gestionnaire of interaction.

## Usage

### Menu déroulant with options

```bdfd
$newModal[Préférences;pref_modal]
$addModalSelect[language;Langue;Choisissez votre langue...;yes]
$addSelectMenuOption[Français;fr;Langue française]
$addSelectMenuOption[English;en;English language]
$addSelectMenuOption[Español;es;Idioma español]
```

### Menu optional

```bdfd
$newModal[Sondage;survey_modal]
$addModalTextDisplay[Question bonus (optionalle) :]
$addModalSelect[os;Système of exploitation;Selectionnez votre OS;no]
$addSelectMenuOption[Windows;win]
$addSelectMenuOption[macOS;mac]
$addSelectMenuOption[Linux;linux]
```

### Récupération of the value

```bdfd
$onInteraction[modal_submit]
$var[lang;$input[language]]
$sendMessage[Langue selectionnée : $var[lang]]
$endInteraction
```

## Notes

- Doit être suivi of calls to `$addSelectMenuOption[]` to set les choix availables.
- Le `customId` must be unique to the sein of the modal.
- Maximum 25 options par menu déroulant (limitation Discord).
- La value retournée par `$input[]` est la `value` of the option selectionnée, pas son `label`.
