---
layout: doc
title: $addModalRadioGroup[]
translation_key: docs
category: "Embed & Message"
function_name: addModalRadioGroup
syntax: $addModalRadioGroup[customId;label;(required)]
description: Creates a group of radio buttons in a modal. The user can only select a single option at a time. The options are added using $addRadioGroupOption().
---

# $addModalRadioGroup[] — Radio Button Group

`$addModalRadioGroup[]` creates a container of radio buttons in a modal. Unlike checkboxes, only a single choice can be selected from the group options.

## Syntax

```
$addModalRadioGroup[customId;label;(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the group. |
| `label` | Yes | — | Label above the group. |
| `required` | No | `yes` | `yes` if required. |

## Return value

Initializes a radio group. The value of the selected option is accessible via `$input[customId]`.

## Usage

### Simple radio group

```bdfd
$newModal[Registration;signup_modal]
$addModalTextInput[name;Name;short;;;yes;2;50]
$addModalRadioGroup[gender;Gender;yes]
$addRadioGroupOption[gender;Male;male]
$addRadioGroupOption[gender;Female;female]
$addRadioGroupOption[gender;Non-binary;nb]
```

### Group with option by default

```bdfd
$newModal[Preferences;pref_modal]
$addModalRadioGroup[lang;Preferred language;yes]
$addRadioGroupOption[;French;fr;;yes]
$addRadioGroupOption[;English;en]
$addRadioGroupOption[;Spanish;es]
```

### Retrieving the selection

```bdfd
$onInteraction[signup_submit]
$var[gender;$input[gender]]
$if[$var[gender]==male]
  $sendMessage[Welcome to the server!]
$elseif[$var[gender]==female]
  $sendMessage[Welcome to the server!]
$endif
$endInteraction
```

## Differences: Radio vs Checkbox

| Radio Group | Checkbox Group |
|-------------|---------------|
| Only a single option selectable | Multiple options selectable |
| Returns a single value | Returns a list of values |
| Ideal for mutually exclusive choices | Ideal for multiple selections |

## Notes

- Options are added using `$addRadioGroupOption[]`.
- Like with checkbox groups, the `menuId` can be omitted in `$addRadioGroupOption[]` to target the last group created.
- Maximum of 25 options per radio group.
