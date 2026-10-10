---
layout: doc
title: $addModalTextDisplay[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalTextDisplay
syntax: $addModalTextDisplay[content]
description: Displays a static informational text in a modal. This component is not interactive — it only serves to present instructions, descriptions, or information to the user.
---

# $addModalTextDisplay[] — Modal Text Display

`$addModalTextDisplay[]` adds a block of static text to the modal being built with `$newModal[]`. It is useful for instructions or explanations; it produces no value.

## Syntax

```text
$addModalTextDisplay[content]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `content` | Yes | The text to display. |

## Return value

Returns an empty string. The text is added to the current modal; it produces no value for `$input[]`.

## Behavior

- The component is added to the modal being built with `$newModal[]`. Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`), and a `$newModal[]` called after that fails with `A modal is already being built.`: always call `$newModal[]` first.
- This function takes exactly one argument and has no boolean or numeric parameter.
- The engine does not check the length of the label, description or placeholder when the function runs.
- The modal is sent when the script ends. It must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`; `$addModalTextDisplay[]` counts too), and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`). It can only answer a slash-command or component interaction that has not been answered yet.
- When the modal is submitted, the values are read with `$input[customId]` and the modal ID with `$customID`.

## Examples

### General instructions

```bdfd
$newModal[form_modal;Form]
$addModalTextDisplay[**Welcome!** Fill out this form to continue.]
$addModalTextInput[Full name;;name;short;2;50;yes]
```

### Text between inputs

```bdfd
$newModal[full_register;Full Registration]
$addModalTextDisplay[Identity]
$addModalTextInput[First name;;firstname;short;2;30;yes]
$addModalTextInput[Last name;;lastname;short;2;30;yes]
$addModalTextDisplay[Contact]
$addModalTextInput[Email;;email;short;5;100;yes]
```

## Notes

- The text display counts towards the limit of 5 components of a modal.
- It is added in call order, together with the other components.
