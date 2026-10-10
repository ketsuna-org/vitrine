---
layout: doc
title: $embedSuppressErrors
translation_key: docs
category: "Control Flow"
function_name: embedSuppressErrors
syntax: $embedSuppressErrors[title;description;(color);(author);(footer);(footerIconURL)]
description: Replaces the error message shown when a function fails with a custom error embed built from its arguments (title, description, color, author, footer).
---
`$embedSuppressErrors[]` configures an **error embed**: when a function of the command raises an error, the command stops and the error is displayed as an embed built from the arguments of `$embedSuppressErrors`, instead of the default error message.

## Syntax

```
$embedSuppressErrors[title;description;(color);(author);(footer);(footerIconURL)]
```

## Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `title` | Yes | Embed title (may be empty). |
| `description` | Yes | Embed description (may be empty). If empty, the original error message is used as the description. |
| `color` | No | Embed color: `#RRGGBB` or an integer. Invalid values raise "Invalid embed color.". |
| `author` | No | Author name. |
| `footer` | No | Footer text. |
| `footerIconURL` | No | Footer icon; must be an HTTP(S) URL, otherwise "Invalid footer icon URL.". |

Between 2 and 6 arguments are required; a bare `$embedSuppressErrors` is refused ("Invalid argument count"). At least one field must be non-empty ("At least one error embed field is required.").

## How It Works

- When called, the error embed is registered for the **current command execution**; nothing is displayed until an error occurs.
- When a native error is raised afterwards, the command stops, the previous output is discarded, and the embed is sent as the error response.
- Calling `$embedSuppressErrors` cancels a previous `$suppressErrors` message, and calling `$suppressErrors` cancels a previous error embed (the last one wins).
- Errors raised before the function is executed are not intercepted.

## Comparison with $suppressErrors

| Function | Effect |
|----------|--------|
| `$embedSuppressErrors[...]` | Shows errors as a custom embed |
| `$suppressErrors[(message)]` | Shows errors as a custom text message (empty if no argument) |

## Example: Custom error embed

```bdfd
$embedSuppressErrors[Something went wrong;;#E74C3C;;Please retry later]
$kick[$mentioned[1]]
```

If `$kick` fails, an embed titled "Something went wrong" is shown, with the original error message as its description and the footer "Please retry later".
