---
layout: doc
title: $addModalCheckboxGroup[]
translation_key: docs
category: "Embed & Message"
function_name: addModalCheckboxGroup
syntax: $addModalCheckboxGroup[customId;label;(required)]
description: Creates a checkbox group in a modal. The individual options are added using $addCheckboxGroupOption[].
---

# $addModalCheckboxGroup[] — Checkbox Group

`$addModalCheckboxGroup[]` creates a container for a checkbox group in a modal. Options are then added using `$addCheckboxGroupOption[]`. The user can check multiple options simultaneously.

## Syntax

```
$addModalCheckboxGroup[customId;label;(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the group. |
| `label` | Yes | — | Descriptive label above the group. |
| `required` | No | `yes` | `yes` if a selection is required. |

## Return value

Initializes a checkbox group. Checked values are accessible via `$input[customId]` as a comma-separated list.

## Usage

### Interests group

```bdfd
$newModal[Profile;profile_modal]
$addModalTextInput[username;Username;short;;;yes;3;32]
$addModalCheckboxGroup[hobbies;Hobbies;no]
$addCheckboxGroupOption[;Reading;reading;Books and novels]
$addCheckboxGroupOption[;Cinema;movies;Movies and series]
$addCheckboxGroupOption[;Cooking;cooking;Culinary art]
$addCheckboxGroupOption[;Travel;travel;Discover the world]
```

### Required group

```bdfd
$newModal[Survey;sondage_modal]
$addModalCheckboxGroup[features;Requested Features;yes]
$addCheckboxGroupOption[;Notifications;notif]
$addCheckboxGroupOption[;Dark Mode;darkmode]
$addCheckboxGroupOption[;Export data;export]
```

### Retrieving values

```bdfd
$onInteraction[profile_submit]
$var[hobbies;$input[hobbies]]
$sendMessage[Selected hobbies: $var[hobbies]]
$endInteraction
```

## Notes

- Options are added using `$addCheckboxGroupOption[]` where the `menuId` can be omitted to target the last group created.
- The returned value is a string containing the values of the checked options, separated by commas.
- Maximum of 25 options per group (Discord limit).

