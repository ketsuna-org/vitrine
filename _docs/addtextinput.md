---
layout: doc
title: $addTextInput[]
translation_key: docs
category: "Components & Interactions"
function_name: addTextInput
syntax: $addTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
description: Adds a text input field directly in a message (message component, non-modal). Supports the "short" and "paragraph" styles.
---

# $addTextInput[] — Message Text Input

`$addTextInput[]` adds a text input component directly in a Discord message. Unlike `$addModalTextInput[]` which requires a modal, this function inserts the text field as an interactive component of the message.

## Syntax

```
$addTextInput[customId;label;(style);(placeholder);(default);(required);(minLength);(maxLength)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the field. |
| `label` | Yes | — | Label text. |
| `style` | No | `short` | `short` or `paragraph`. |
| `placeholder` | No | — | Placeholder text. |
| `default` | No | — | Default value. |
| `required` | No | `yes` | `yes` or `no`. |
| `minLength` | No | — | Minimum number of characters. |
| `maxLength` | No | — | Maximum number of characters. |

## Return value

Adds the TextInput to the message. The input value is retrieved via `$input[customId]` in the interaction handler.

## Usage

### Search field

```bdfd
$title[Search]
$description[Enter your search term below]
$addTextInput[query;Search term;short;Search...;;yes;2;100]
$addButton[search;Search;Primary;;search_action]
```

### Feedback form

```bdfd
$title[Feedback]
$description[We want your opinion!]
$addTextInput[name;Your name;short;Anonymous;;no;0;50]
$addTextInput[message;Your message;paragraph;Write your feedback here...;;yes;10;1000]
$addButton[submit;Send;Success]
```

### Processing the response

```bdfd
$onInteraction[search_action]
$var[query;$input[query]]
$sendMessage[Results for: **$var[query]**]
$endInteraction
```

## Differences with $addModalTextInput[]

| Message TextInput | Modal TextInput |
|-------------------|-----------------|
| Directly in the message | In a modal (pop-up) |
| Often accompanied by buttons | Submitted with the modal's Submit button |
| No limit of 5 components | Limited to 5 components per modal |

## Notes

- The `customId` must be unique within the message.
- The value is retrieved via `$input[customId]` in a `$onInteraction` handler.
- `minLength` and `maxLength` are validated on the Discord client side.
- Label max 45 characters, placeholder max 100 characters.

