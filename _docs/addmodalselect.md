---
layout: doc
title: $addModalSelect[]
translation_key: docs
category: "Embed & Message"
function_name: addModalSelect
syntax: $addModalSelect[customId;label;(placeholder);(required)]
description: Ajoute a menu déroulant (select/dropdown) à a modal Discord. The options sont ajoutées avec $addSelectMenuOption[].
---

# $addModalSelect[] — Menu Déroulant dans un Modal

`$addModalSelect[]` ajoute a menu déroulant (select menu) à a modal. The options du menu sont définies avec `$addSelectMenuOption[]` after this call.

## Syntax

```
$addModalSelect[customId;label;(placeholder);(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier to retrieve the value after soumission. |
| `label` | Yes | — | Text displayed above du menu. |
| `placeholder` | No | — | Text indicatif in the menu non selectionné. |
| `required` | No | `yes` | `yes` si required, `no` otherwise. |

## Return value

Ajoute le composant Select au modal in progress. The value selectionnée est accessible via `$input[customId]` in the gestionnaire d'interaction.

## Usage

### Menu déroulant avec options

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
$addModalSelect[os;Système d'exploitation;Selectionnez votre OS;no]
$addSelectMenuOption[Windows;win]
$addSelectMenuOption[macOS;mac]
$addSelectMenuOption[Linux;linux]
```

### Récupération de the value

```bdfd
$onInteraction[modal_submit]
$var[lang;$input[language]]
$sendMessage[Langue selectionnée : $var[lang]]
$endInteraction
```

## Notes

- Doit être suivi d'calls à `$addSelectMenuOption[]` to set les choix availables.
- Le `customId` must be unique au sein of the modal.
- Maximum 25 options par menu déroulant (limitation Discord).
- La value retournée par `$input[]` est la `value` of the option selectionnée, pas son `label`.
