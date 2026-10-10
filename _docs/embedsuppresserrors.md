---
layout: doc
title: $embedSuppressErrors
translation_key: docs
category: "Control Flow"
function_name: embedSuppressErrors
syntax: $embedSuppressErrors[title;description;(color);(author);(footer);(footerIconURL)]
description: Replaces the error message shown when a function fails with a custom error embed built from its arguments (title, description, color, author, footer).
---

`$embedSuppressErrors[]` configures an **error embed**: when a function of the script raises an error, the script stops and the error is displayed as an embed built from the arguments of `$embedSuppressErrors`, instead of the default error message.

## Syntax

```text
$embedSuppressErrors[title;description;(color);(author);(footer);(footerIconURL)]
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `title` | Yes | Embed title (may be empty). |
| `description` | Yes | Embed description (may be empty). If empty, the original error message is used as the description. |
| `color` | No | Embed color: `#RRGGBB` or an integer from 0 to 16777215. An invalid value raises `Invalid embed color.` |
| `author` | No | Author name. |
| `footer` | No | Footer text. |
| `footerIconURL` | No | Footer icon; must be an HTTP(S) URL, otherwise `Invalid footer icon URL.` It is only used when `footer` is not empty. |

Between 2 and 6 arguments are required; a bare `$embedSuppressErrors` is refused (`Invalid argument count`). At least one field must be non-empty (`At least one error embed field is required.`).

## How It Works

- When called, the error embed is registered for the **current script**; nothing is displayed until an error occurs.
- When a function raises an error afterwards, the script stops, the response written so far is discarded, and the embed is sent as the response.
- Calling `$embedSuppressErrors` cancels a previous `$suppressErrors` message, and calling `$suppressErrors` cancels a previous error embed (the last one wins).
- Errors detected before the script runs (for example a wrong number of arguments) and errors raised before `$embedSuppressErrors` is executed are not intercepted.
- Messages already sent with `$sendMessage` stay sent.

## Comparison with $suppressErrors

| Function | Effect |
|----------|--------|
| `$embedSuppressErrors[...]` | Shows errors as a custom embed |
| `$suppressErrors[(message)]` | Shows errors as a custom text message (empty if no argument) |

## Example: Custom error embed

```bdfd
$embedSuppressErrors[Something went wrong;;#E74C3C;;Please retry later]
Result: $sum[1;oops]
```

`$sum[1;oops]` fails, so an embed titled "Something went wrong" is sent, with the original error message as its description, the color `#E74C3C` and the footer "Please retry later".
