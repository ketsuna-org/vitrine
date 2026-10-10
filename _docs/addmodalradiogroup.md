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

`$addModalRadioGroup[]` creates a container of radio buttons in the modal being built with `$newModal[]`. Options are then added with `$addRadioGroupOption[]`.

## Syntax

```
$addModalRadioGroup[label;description;customId;(required)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Label above the group. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier of the group. |
| `required` | No | `yes` | `yes`/`true` or `no`/`false`. |

## Return value

Returns an empty string. An empty radio group is added to the current modal; the value is read with `$input[customId]`.

## Errors

- Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`) to receive the input.
- `required`/`disabled` values other than yes/no/true/false and out-of-range numbers are errors.
- When the modal is sent, it must contain 1 to 5 inputs (text displays count as inputs).

## Examples

### Simple radio group

```bdfd
$newModal[signup_modal;Registration]
$addModalTextInput[Name;;name;short;2;50;yes]
$addModalRadioGroup[Gender;;gender;yes]
$addRadioGroupOption[gender;Male;male]
$addRadioGroupOption[gender;Female;female]
$addRadioGroupOption[gender;Non-binary;nb]
```

### Group with option by default

```bdfd
$newModal[pref_modal;Preferences]
$addModalRadioGroup[Preferred language;;lang;yes]
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

## Notes

- Options are added using `$addRadioGroupOption[]`.
- If the first argument of `$addRadioGroupOption[]` is empty, the option goes to the last radio group created in the modal.
- `$newModal[]` takes the modal ID first, then its title.
