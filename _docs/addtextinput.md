---
layout: doc
title: $addTextInput[]
translation_key: docs
category: "Components & Interactions"
function_name: addTextInput
syntax: $addTextInput[customId;style;label;(minLength);(maxLength);(required);(default);(placeholder)]
description: Adds a classic text input to the modal being built with $newModal[]. The style must be "short" or "paragraph".
---

# $addTextInput[] — Modal Text Input (classic)

`$addTextInput[]` adds a text input to the modal started with `$newModal[]`. It is not a message component: it requires a modal to be in progress. For the Components V2 modal inputs, see `$addModalTextInput[]`.

## Syntax

```text
$addTextInput[customId;style;label;(minLength);(maxLength);(required);(default);(placeholder)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `customId` | Yes | — | Unique identifier of the field (1 to 100 characters). |
| `style` | Yes | — | `short` or `paragraph` (any other value is an error). |
| `label` | Yes | — | Label text (1 to 45 characters). |
| `minLength` | No | `0` | Minimum number of characters (integer from 0 to 4000). |
| `maxLength` | No | `4000` | Maximum number of characters (integer from 1 to 4000). Must not be lower than `minLength`. |
| `required` | No | `yes` | `yes`/`true` or `no`/`false`. |
| `default` | No | empty | Pre-filled value (0 to 4000 characters). |
| `placeholder` | No | empty | Placeholder text (0 to 100 characters). |

## Return value

Returns an empty string. The input is added to the current modal.

## Errors

- `$newModal[]` must have been called before, otherwise: "Create a modal before adding text inputs."
- A modal supports at most 5 inputs, and input IDs must be unique.
- An invalid `style`, a length out of range, a non-integer `minLength`/`maxLength`, or a `required` value other than yes/no/true/false is an error.

## Examples

### Search modal

```bdfd
$newModal[search_modal;Search]
$addTextInput[query;short;Search term;2;100;yes;;Search...]
```

### Feedback modal

```bdfd
$newModal[feedback_modal;Feedback]
$addTextInput[name;short;Your name;0;50;no;;Anonymous]
$addTextInput[message;paragraph;Your message;10;1000;yes;;Write your feedback here...]
```

## Notes

- Unlike the `$addModal*` functions, `$addTextInput` does not create a default modal: it fails without a prior `$newModal[]`.
- When the modal is sent, it must hold 1 to 5 components (`A modal requires 1 to 5 inputs.`) and the script must not also produce text, embeds or component rows (`A modal cannot be combined with a message response.`).
- The value of an input is read with `$input[customId]` when the modal is submitted.
- `$newModal[]` takes the modal ID first, then its title.
