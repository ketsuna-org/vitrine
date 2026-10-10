---
layout: doc
title: $addModalRadioGroup[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalRadioGroup
syntax: $addModalRadioGroup[label;description;customId;(required)]
description: Creates a group of radio buttons in the modal being built. Options are added using $addRadioGroupOption[].
---

# $addModalRadioGroup[] — Radio Button Group

`$addModalRadioGroup[]` creates a group of radio buttons in the modal being built with `$newModal[]`. Options are then added with `$addRadioGroupOption[]`.

## Syntax

```text
$addModalRadioGroup[label;description;customId;(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Label above the group. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier of the group. |
| `required` | No | `yes` | `yes`/`true` or `no`/`false` (empty gives `yes`). |

## Return value

Returns an empty string. An empty radio group is added to the current modal; the chosen option value is read with `$input[customId]`.

## Behavior

- The component is added to the modal being built with `$newModal[]`. Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`), and a `$newModal[]` called after that fails with `A modal is already being built.`: always call `$newModal[]` first.
- A boolean argument other than `yes`/`true`/`no`/`false` is an error (`Expected yes or no, got "<value>".`).
- The engine does not check the length of the label, description or placeholder when the function runs.
- The modal is sent when the script ends. It must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`; `$addModalTextDisplay[]` counts too), and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`). It can only answer a slash-command or component interaction that has not been answered yet.
- When the modal is submitted, the values are read with `$input[customId]` and the modal ID with `$customID`.

## Examples

### Simple radio group

```bdfd
$newModal[signup_modal;Registration]
$addModalTextInput[Name;;name;short;2;50;yes]
$addModalRadioGroup[Plan;;plan;yes]
$addRadioGroupOption[plan;Free;free]
$addRadioGroupOption[plan;Pro;pro]
$addRadioGroupOption[plan;Team;team]
```

### Group with a default option

```bdfd
$newModal[pref_modal;Preferences]
$addModalRadioGroup[Preferred language;;lang;yes]
$addRadioGroupOption[;French;fr;;yes]
$addRadioGroupOption[;English;en]
$addRadioGroupOption[;Spanish;es]
```

### Retrieving the selection

```bdfd
$if[$customID==signup_modal]
  You chose the plan $input[plan].
$endif
```

## Notes

- Options are added using `$addRadioGroupOption[]`; the engine does not check that the group has options or how many.
- If the first argument of `$addRadioGroupOption[]` is empty, the option goes to the last radio group created in the modal.
- `$newModal[]` takes the modal ID first, then its title.
