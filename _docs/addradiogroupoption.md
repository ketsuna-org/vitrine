---
layout: doc
title: $addRadioGroupOption[]
translation_key: docs
category: "Components & Interactions"
function_name: addRadioGroupOption
syntax: $addRadioGroupOption[menuId;label;value;(description);(default)]
description: Adds an individual option to a group of radio buttons in a modal. The menuId can be omitted to target the last group created.
---

# $addRadioGroupOption[] — Radio Group Option

`$addRadioGroupOption[]` adds an option to a radio group created with `$addModalRadioGroup[]` in the modal being built.

## Syntax

```text
$addRadioGroupOption[menuId;label;(value);(description);(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `menuId` | Yes (may be empty) | — | `customId` of the parent group. If empty, the last radio group of the modal is used. |
| `label` | Yes | — | Text displayed for the option. |
| `value` | No | the `label` | Value returned if selected. An empty value is sent as empty (it does not fall back to the label). |
| `description` | No | empty | Optional description (only sent if not empty). |
| `default` | No | `no` | `yes`/`true` if selected by default, `no`/`false` otherwise. Any other value is an error (`Expected yes or no, got "<value>".`). |

## Return value

Returns an empty string. The option is added to the group. If no group matches (no modal yet, no radio group yet, or no group with that `menuId`), nothing happens and no error is raised.

## Examples

### Group with detailed options

```bdfd
$newModal[sub_modal;Subscription]
$addModalRadioGroup[Subscription level;;tier;yes]
$addRadioGroupOption[tier;Free;free;Basic features;yes]
$addRadioGroupOption[tier;Pro;pro;Unlimited access, priority support;no]
$addRadioGroupOption[tier;Enterprise;ent;Custom solution, guaranteed SLA;no]
```

### Without explicit menuId

```bdfd
$newModal[feedback_modal;Feedback]
$addModalRadioGroup[Satisfaction;;satisfaction;yes]
$addRadioGroupOption[;Very satisfied;5;Excellent!;no]
$addRadioGroupOption[;Satisfied;4;Good;no]
$addRadioGroupOption[;Neutral;3;Average;no]
```

## Notes

- The value is read with `$input[customId]` of the group when the modal is submitted.
- The group must exist before the option is added: the options are matched at the time of the call, searching the latest group first.
- The engine does not limit the number of options nor check lengths.
- `$newModal[]` takes the modal ID first, then its title.
