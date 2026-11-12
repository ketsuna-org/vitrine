---
layout: doc
title: $endsWith[]
translation_key: docs
category: "Control Flow"
function_name: endsWith
syntax: $endsWith[text;suffix;(suffix2;...);errorMessage]
description: Stops command execution if the given text does not end with one of the listed suffixes (case-insensitive), and outputs the error message.
---

# $endsWith[] — Suffix Guard

`$endsWith` is a guard that checks whether a text (usually `$message`) ends with at least **one** of the listed suffixes. If none matches, the script stops and the last argument replaces the response.

## Syntax

```text
$endsWith[text;suffix;(suffix2;...);errorMessage]
```

At least 3 arguments are required (`text`, one suffix, `errorMessage`).

| Parameter | Description |
|---|---|
| `text` | Required. The text to check (for example `$message`). |
| `suffix;(suffix2;...)` | Required, at least one. The text passes when it ends with **any** of them. |
| `errorMessage` | Required (the last argument, may be empty). Replaces the response when no suffix matches. |

## How It Works

1. The text and each suffix are converted to lower case.
2. If at least one suffix is at the end of the text, the script continues and the function returns an empty string.
3. Otherwise the script stops. The response written so far is discarded and replaced by `errorMessage`. An empty `errorMessage` discards the response and sends nothing.

Matching is **case-insensitive**. An empty suffix always matches. If `$suppressErrors[text]` was used before, `errorMessage` is replaced by that text.

## Related

- `$onlyIfMessageContains` — same guard, but tests that the text *contains* words.
- `$onlyIf` — for any other condition.
- `$checkContains` — inline true/false substring check.

## Examples

```bdfd
$endsWith[$message;please;Be polite: end your message with "please"]
$description[Thank you for being polite!]
```

Several suffixes: `$endsWith[$message;.png;.jpg;Send an image link]` lets `cat.PNG` and `dog.jpg` through and stops `cat.gif`.
