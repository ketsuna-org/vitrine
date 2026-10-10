---
layout: doc
title: $addModalTextInput[]
translation_key: docs
category: "Components & Interactions"
function_name: addModalTextInput
syntax: $addModalTextInput[label;description;customId;(style);(minLength);(maxLength);(required);(default);(placeholder)]
description: Adds a Components V2 text input (wrapped in a label) to the modal being built. The style defaults to "short".
---

# $addModalTextInput[] — Modal Text Input

`$addModalTextInput[]` adds a text input field to the modal being built with `$newModal[]`. The input is wrapped in a label (Components V2 modal) with an optional description.

## Syntax

```
$addModalTextInput[label;description;customId;(style);(minLength);(maxLength);(required);(default);(placeholder)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `label` | Yes | — | Label text above the field. |
| `description` | Yes | — | Description under the label. May be left empty (`;;`), in which case no description is sent. |
| `customId` | Yes | — | Identifier used to retrieve the value after submission. |
| `style` | No | `short` | `short` or `paragraph`. An empty value gives `short`. |
| `minLength` | No | `0` | Minimum number of characters (integer from 0 to 4000). |
| `maxLength` | No | `4000` | Maximum number of characters (integer from 1 to 4000). |
| `required` | No | `yes` | `yes`/`true` or `no`/`false`. |
| `default` | No | empty | Pre-filled value. |
| `placeholder` | No | empty | Placeholder text. |

## Return value

Returns an empty string. The input is added to the current modal; its value is read with `$input[customId]` once the modal is submitted.

## Errors

- Without a prior `$newModal[]`, the engine creates a default modal (ID `modal`, title `Modal`) to receive the input.
- `required`/`disabled` values other than yes/no/true/false and out-of-range numbers are errors.
- When the modal is sent, it must contain 1 to 5 inputs (text displays count as inputs).

## Examples

### Required short field

```bdfd
$newModal[contact_form;Contact]
$addModalTextInput[Full name;;name;short;2;50;yes;;John Doe]
$addModalTextInput[Email address;;email;short;5;100;yes;;contact@site.com]
```

### Free text area

```bdfd
$newModal[feedback_form;Feedback]
$addModalTextInput[Your comments;Tell us what you think;comments;paragraph;10;1000;yes;;Write your message here...]
```

### Optional field with placeholder

```bdfd
$newModal[profile_form;Profile]
$addModalTextInput[Website;;website;short;0;200;no;;https://...]
```

## Notes

- `$newModal[]` takes the modal ID first, then its title.
- A modal sent to Discord must contain 1 to 5 inputs.
