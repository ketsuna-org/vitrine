---
layout: doc
title: $addModalCheckbox[]
translation_key: docs
category: "Embed & Message"
function_name: addModalCheckbox
syntax: $addModalCheckbox[customId;label;(default)]
description: Adds an individual checkbox to a Discord modal.
---

# $addModalCheckbox[] — Modal Checkbox

`$addModalCheckbox[]` adds a single checkbox to a modal. Unlike `$addModalCheckboxGroup[]` which creates a group, this function creates a single isolated checkbox.

## Syntax

```
$addModalCheckbox[customId;label;(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier to retrieve the state. |
| `label` | Yes | — | Text displayed next to the checkbox. |
| `default` | No | `no` | `yes` if checked by default, `no` otherwise. |

## Return value

Adds a checkbox to the modal. The submitted value is `yes` or `no`, accessible via `$input[customId]`.

## Usage

### Simple checkbox

```bdfd
$newModal[Registration;register_modal]
$addModalTextInput[name;Name;short;;;yes;2;50]
$addModalCheckbox[newsletter;Subscribe to newsletter;yes]
$addModalCheckbox[tos;Accept Terms of Service;no]
```

### Verifying the state

```bdfd
$onInteraction[modal_register]
$if[$input[tos]==yes]
  $sendMessage[Terms accepted ✓]
$else
  $sendMessage[You must accept the terms!]
$endif
$endInteraction
```

## Notes

- For groups of checkboxes with multiple options, use `$addModalCheckboxGroup[]` and `$addCheckboxGroupOption[]`.
- The returned state is a string: `yes` or `no`.
- An individual checkbox counts as a component towards the limit of 5 components per modal.

