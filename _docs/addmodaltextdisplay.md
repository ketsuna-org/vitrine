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

`$addModalTextDisplay[]` inserts a block of non-interactive text in a modal. This is the equivalent of an informational paragraph — useful for providing instructions, separating sections, or displaying contextual information.

## Syntax

```
$addModalTextDisplay[content]
```

## Parameters

| Parameter | Required | Description |
|-----------|-------------|-------------|
| `content` | Yes | The text to display. Supports basic markdown. |

## Return value

Adds a text display component to the modal. No interactive value is returned — this component does not produce any form data.

## Usage

### General instructions

```bdfd
$newModal[Form;form_modal]
$addModalTextDisplay[**Welcome!** Fill out this form to continue.]
$addModalTextInput[name;Full name;short;;;yes;2;50]
```

### Sections with separators

```bdfd
$newModal[Full Registration;full_register]
$addModalTextDisplay[__Section 1: Identity__]
$addModalTextInput[firstname;First Name;short;;;yes;2;30]
$addModalTextInput[lastname;Last Name;short;;;yes;2;30]

$addModalTextDisplay[__Section 2: Contact__]
$addModalTextInput[email;Email;short;;;yes;5;100]
$addModalTextInput[phone;Phone;short;;;no;10;15]
```

### Warnings and notes

```bdfd
$newModal[Deletion;delete_modal]
$addModalTextDisplay[⚠️ **Warning:** This action is irreversible!]
$addModalTextDisplay[All of your data will be permanently deleted.]
$addModalTextInput[confirm;Type CONFIRM to continue;short;;;yes;8;8]
```

### With dynamic variables

```bdfd
$newModal[Confirmation;confirm_modal]
$addModalTextDisplay[You are about to buy **$var[product_name]** for **$var[price]€**.]
$addModalTextDisplay[Estimated delivery date: $var[delivery_date]]
```

## Notes

- The text supports Discord formatting: `**bold**`, `*italic*`, `__underline__`, `~~strikethrough~~`.
- Emojis are supported.
- This component does not produce any value in `$input[]`.
- It does not count towards the limit of 5 interactive components (TextInput, Select) but occupies a placeholder in the component rows of the modal.

