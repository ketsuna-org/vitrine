---
layout: doc
title: $addModalCheckbox[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalCheckbox
syntax: $addModalCheckbox[label;description;customId;(default)]
description: Adds an individual checkbox to the modal being built.
---

# $addModalCheckbox[] — Modal Checkbox

`$addModalCheckbox[]` adds a single checkbox to the modal being built with `$newModal[]`. Unlike `$addModalCheckboxGroup[]` which creates a group, this function creates a single isolated checkbox.

## Syntax

```
$addModalCheckbox[label;description;customId;(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Text of the checkbox. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`). |
| `customId` | Yes | — | Identifier used to retrieve the state. |
| `default` | No | `no` | `yes`/`true` if checked by default, `no`/`false` otherwise. |

## Return value

Returns an empty string. The checkbox is added to the current modal.

## Errors

- Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`) to receive the input.
- `required`/`disabled` values other than yes/no/true/false and out-of-range numbers are errors.
- When the modal is sent, it must contain 1 to 5 inputs (text displays count as inputs).

## Examples

### Simple checkbox

```bdfd
$newModal[register_modal;Registration]
$addModalTextInput[Name;;name;short;2;50;yes]
$addModalCheckbox[Subscribe to newsletter;;newsletter;yes]
$addModalCheckbox[Accept Terms of Service;;tos;no]
```

## Notes

- For groups of checkboxes with multiple options, use `$addModalCheckboxGroup[]` and `$addCheckboxGroupOption[]`.
- An individual checkbox counts as an input towards the limit of 5 inputs per modal.
- `$newModal[]` takes the modal ID first, then its title.
