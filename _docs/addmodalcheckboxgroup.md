---
layout: doc
title: $addModalCheckboxGroup[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalCheckboxGroup
syntax: $addModalCheckboxGroup[customId;label;(required)]
description: Creates a checkbox group in a modal. The individual options are added using $addCheckboxGroupOption[].
---

# $addModalCheckboxGroup[] — Checkbox Group

`$addModalCheckboxGroup[]` creates a group of checkboxes in the modal being built with `$newModal[]`. Options are then added using `$addCheckboxGroupOption[]`.

## Syntax

```text
$addModalCheckboxGroup[label;description;customId;(minValues);(maxValues);(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Descriptive label above the group. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier of the group. |
| `minValues` | No | `1` | Minimum number of checked options (integer from 0 to 25, otherwise `Expected an integer from 0 to 25.`). |
| `maxValues` | No | `1` | Maximum number of checked options (integer from 1 to 25, otherwise `Expected an integer from 1 to 25.`). |
| `required` | No | `yes` | `yes`/`true` or `no`/`false` (empty gives `yes`). |

## Return value

Returns an empty string. An empty checkbox group is added to the current modal. When several values are submitted, `$input[customId]` returns them joined by commas.

## Behavior

- The component is added to the modal being built with `$newModal[]`. Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`), and a `$newModal[]` called after that fails with `A modal is already being built.`: always call `$newModal[]` first.
- A boolean argument other than `yes`/`true`/`no`/`false` is an error (`Expected yes or no, got "<value>".`). An integer out of range is an error too; the engine does not compare `minValues` with `maxValues`.
- The engine does not check the length of the label, description or placeholder when the function runs.
- The modal is sent when the script ends. It must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`; `$addModalTextDisplay[]` counts too), and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`). It can only answer a slash-command or component interaction that has not been answered yet.
- When the modal is submitted, the values are read with `$input[customId]` and the modal ID with `$customID`.

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
$newModal[survey_modal;Survey]
$addModalCheckboxGroup[Requested Features;;features;1;3;yes]
$addCheckboxGroupOption[;Notifications;notif]
$addCheckboxGroupOption[;Dark Mode;darkmode]
$addCheckboxGroupOption[;Export data;export]
```

### Retrieving values

```bdfd
$if[$customID==profile_modal]
  Selected hobbies: $input[hobbies]
$endif
```

## Notes

- If the first argument of `$addCheckboxGroupOption[]` is empty, the option goes to the last checkbox group created in the modal.
- `$newModal[]` takes the modal ID first, then its title.
