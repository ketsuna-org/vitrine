---
layout: doc
title: $newModal[]
translation_key: docs
category: "Components & Interactions"
function_name: newModal
syntax: $newModal[title;customId]
description: Creates a new modal (interactive pop-up window) with a title and a custom identifier to handle submissions.
---

# $newModal[] — Create a Modal

The function `$newModal[]` initializes a new Discord modal. A modal is an interactive pop-up window that overlays the user interface. It must be the first call before adding components such as text fields, selectors, or checkboxes.

## Syntax

```
$newModal[title;customId]
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `title` | The title displayed at the top of the modal. Required. |
| `customId` | A unique custom identifier for the modal. Used in interactions to identify which modal was submitted. Required. |

## Return Value

This function does not return a value directly. It initializes an internal context in which the functions to add components (`$addModalTextInput`, etc.) operate.

## Usage

### Basic Modal

```bdfd
$newModal[Registration;signup_modal]
$addModalTextInput[username;Username;short;Enter your username...;;yes;3;32]
$addModalTextInput[email;Email;short;example@email.com;;yes;5;100]
```

### Modal with display text

```bdfd
$newModal[Confirmation;confirm_modal]
$addModalTextDisplay[Please check the information before confirming.]
$addModalTextInput[code;Verification Code;short;XXXX;;yes;4;4]
```

### Modal sent via a slash command or a button

```bdfd
$newModal[Product Review;review_modal]
$addModalTextInput[rating;Rating (1-5);short;;1;;1;1]
$addModalTextInput[review;Your Review;paragraph;Share your experience...;;yes;10;500]
```

## Important Notes

- `$newModal[]` must be the **first** function called when constructing a modal.
- All components added after `$newModal[]` belong to that modal until a new `$newModal[]` is called.
- The `customId` is essential for processing the submitted data in an interaction handler.
- Modals are generally triggered via interactions (buttons, slash commands, select menus).
