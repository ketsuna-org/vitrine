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

`$addRadioGroupOption[]` adds an option to a radio button group created with `$addModalRadioGroup[]`. Only a single option in the group can be selected at a time.

## Syntax

```
$addRadioGroupOption[menuId;label;value;(description);(default)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `menuId` | No | Last group | Identifier of the parent radio group. |
| `label` | Yes | — | Text displayed for the option. |
| `value` | Yes | — | Value returned if selected. |
| `description` | No | — | Optional description. |
| `default` | No | `no` | `yes` if selected by default. |

## Return value

Adds the option to the parent group. The selected value is accessible via `$input[menuId]`.

## Usage

### Group with detailed options

```bdfd
$newModal[Subscription;sub_modal]
$addModalRadioGroup[tier;Subscription level;yes]
$addRadioGroupOption[tier;Free;free;Basic features;yes]
$addRadioGroupOption[tier;Pro;pro;Unlimited access, priority support;no]
$addRadioGroupOption[tier;Enterprise;ent;Custom solution, guaranteed SLA;no]
```

### Without explicit menuId

```bdfd
$newModal[Feedback;feedback_modal]
$addModalRadioGroup[satisfaction;Satisfaction;yes]
$addRadioGroupOption[;Very satisfied;5;Excellent!;no]
$addRadioGroupOption[;Satisfied;4;Good;no]
$addRadioGroupOption[;Neutral;3;Average;no]
$addRadioGroupOption[;Unsatisfied;2;Could do better;no]
$addRadioGroupOption[;Very unsatisfied;1;Needs review;no]
```

### Conditional default option

```bdfd
$newModal[Language;lang_modal]
$addModalRadioGroup[local;Interface language;yes]
$addRadioGroupOption[;French;fr;;yes]
$addRadioGroupOption[;English;en;;no]
```

## Notes

- Only a single option can have `default` set to `yes` in the same radio group.
- If `menuId` is empty, the option targets the last group created.
- The returned value is the `value` of the selected option (not the `label`).
- Maximum of 25 options per radio group.

