---
layout: doc
title: $addModalSelect[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalSelect
syntax: $addModalSelect[customId;label;(placeholder);(required)]
description: Adds a dropdown menu (select/dropdown) to a Discord modal. The options are added using $addSelectMenuOption[].
---

# $addModalSelect[] — Modal Dropdown Menu

`$addModalSelect[]` adds a dropdown menu (select menu) to a modal. The menu options are defined using `$addSelectMenuOption[]` after this call.

## Syntax

```
$addModalSelect[customId;label;(placeholder);(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier to retrieve the value after submission. |
| `label` | Yes | — | Text displayed above the menu. |
| `placeholder` | No | — | Placeholder text when the menu is not selected. |
| `required` | No | `yes` | `yes` if required, `no` otherwise. |

## Return value

Adds the Select component to the current modal. The selected value is accessible via `$input[customId]` in the interaction handler.

## Usage

### Dropdown menu with options

```bdfd
$newModal[Preferences;pref_modal]
$addModalSelect[language;Language;Choose your language...;yes]
$addSelectMenuOption[French;fr;French language]
$addSelectMenuOption[English;en;English language]
$addSelectMenuOption[Spanish;es;Spanish language]
```

### Optional menu

```bdfd
$newModal[Survey;survey_modal]
$addModalTextDisplay[Bonus question (optional):]
$addModalSelect[os;Operating system;Select your OS;no]
$addSelectMenuOption[Windows;win]
$addSelectMenuOption[macOS;mac]
$addSelectMenuOption[Linux;linux]
```

### Retrieving the value

```bdfd
$onInteraction[modal_submit]
$var[lang;$input[language]]
$sendMessage[Selected language: $var[lang]]
$endInteraction
```

## Notes

- Must be followed by calls to `$addSelectMenuOption[]` to set the available choices.
- The `customId` must be unique within the modal.
- Maximum of 25 options per dropdown menu (Discord limitation).
- The value returned by `$input[]` is the `value` of the selected option, not its `label`.

