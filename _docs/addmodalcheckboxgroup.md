---
layout: doc
title: $addModalCheckboxGroup[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalCheckboxGroup
syntax: $addModalCheckboxGroup[label;description;customId;(minValues);(maxValues);(required)]
description: Creates a checkbox group in the modal being built. The individual options are added using $addCheckboxGroupOption[].
---

# $addModalCheckboxGroup[] — Checkbox Group

`$addModalCheckboxGroup[]` creates a container for a checkbox group in the modal being built with `$newModal[]`. Options are then added using `$addCheckboxGroupOption[]`.

## Syntax

```
$addModalCheckboxGroup[label;description;customId;(minValues);(maxValues);(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Descriptive label above the group. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier of the group. |
| `minValues` | No | `1` | Minimum number of checked options (integer from 0 to 25). |
| `maxValues` | No | `1` | Maximum number of checked options (integer from 1 to 25). |
| `required` | No | `yes` | `yes`/`true` or `no`/`false`. |

## Return value

Returns an empty string. An empty checkbox group is added to the current modal. When several values are submitted, `$input[customId]` returns them joined by commas.

## Errors

- Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`) to receive the input.
- `required`/`disabled` values other than yes/no/true/false and out-of-range numbers are errors.
- When the modal is sent, it must contain 1 to 5 inputs (text displays count as inputs).

## Examples

### Interests group

```bdfd
$newModal[profile_modal;Profile]
$addModalTextInput[Username;;username;short;3;32;yes]
$addModalCheckboxGroup[Hobbies;;hobbies;0;4;no]
$addCheckboxGroupOption[;Reading;reading;Books and novels]
$addCheckboxGroupOption[;Cinema;movies;Movies and series]
$addCheckboxGroupOption[;Cooking;cooking;Culinary art]
$addCheckboxGroupOption[;Travel;travel;Discover the world]
```

### Required group

```bdfd
$newModal[sondage_modal;Survey]
$addModalCheckboxGroup[Requested Features;;features;1;3;yes]
$addCheckboxGroupOption[;Notifications;notif]
$addCheckboxGroupOption[;Dark Mode;darkmode]
$addCheckboxGroupOption[;Export data;export]
```

### Retrieving values

```bdfd
$if[$customID==profile_submit]
  $var[hobbies;$input[hobbies]]
  $sendMessage[Selected hobbies: $var[hobbies]]
$endif
```

## Notes

- If the first argument of `$addCheckboxGroupOption[]` is empty, the option goes to the last checkbox group created in the modal.
- `$newModal[]` takes the modal ID first, then its title.
