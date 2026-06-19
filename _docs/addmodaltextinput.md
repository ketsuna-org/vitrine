---
layout: doc
title: $addModalTextInput[]
translation_key: docs
category: "Embed & Message"
function_name: addModalTextInput
syntax: $addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Adds a text input field to a Discord modal. Supports the "short" (single row) and "paragraph" (multi-line) styles.
---

# $addModalTextInput[] — Modal Text Input

`$addModalTextInput[]` adds a text input field inside a modal previously initialized with `$newModal[]`. Discord supports two styles of text fields: short (single-line) and paragraph (multi-line).

## Syntax

```
$addModalTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier to retrieve the value after submission. |
| `label` | Yes | — | Label text above the field. |
| `style` | No | `short` | `short` for a single line, `paragraph` for multiple lines. |
| `placeholder` | No | — | Placeholder text in the empty field. |
| `default` | No | — | Pre-filled value. |
| `required` | No | `yes` | `yes` if required, `no` otherwise. |
| `minLength` | No | — | Minimum number of characters. |
| `maxLength` | No | — | Maximum number of characters. |

## Return value

Adds the TextInput component to the current modal. The input value is accessible via `$input[customId]` in the modal's interaction handler.

## Usage

### Required short field

```bdfd
$newModal[Contact;contact_form]
$addModalTextInput[name;Full name;short;John Doe;;yes;2;50]
$addModalTextInput[email;Email address;short;contact@site.com;;yes;5;100]
```

### Free text area

```bdfd
$newModal[Feedback;feedback_form]
$addModalTextInput[comments;Your comments;paragraph;Write your message here...;;yes;10;1000]
```

### Optional field with placeholder

```bdfd
$newModal[Profile;profile_form]
$addModalTextInput[website;Website;short;https://...;;no;0;200]
```

## Validation

- `minLength` and `maxLength` apply client-side validation in Discord.
- If `required` is `yes`, the modal cannot be submitted without a value.
- Discord limits: `label` max 45 characters, `placeholder` max 100 characters, `minLength` 0-4000, `maxLength` 1-4000.

## Notes

- Must be called after `$newModal[]` and before any other function that finalizes the modal.
- The `customId` must be unique within the modal.
- Maximum of 5 rows of components (5 `$addModalTextInput` calls) per modal according to Discord.

