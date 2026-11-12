---
layout: doc
title: $startsWith[]
translation_key: docs
category: "Control Flow"
function_name: startsWith
syntax: $startsWith[text;prefix;(prefix2;...);errorMessage]
description: Stops command execution if the given text does not start with one of the listed prefixes (case-insensitive), and outputs the error message.
---

# $startsWith[] — Prefix Guard

`$startsWith` is a guard that checks whether a text (usually `$message`) starts with at least **one** of the listed prefixes. If none matches, the script stops and the last argument replaces the response.

## Syntax

```text
$startsWith[text;prefix;(prefix2;...);errorMessage]
```

At least 3 arguments are required (`text`, one prefix, `errorMessage`).

| Parameter | Description |
|---|---|
| `text` | Required. The text to check (for example `$message`). |
| `prefix;(prefix2;...)` | Required, at least one. The text passes when it starts with **any** of them. |
| `errorMessage` | Required (the last argument, may be empty). Replaces the response when no prefix matches. |

## How It Works

1. The text and each prefix are converted to lower case.
2. If at least one prefix is at the start of the text, the script continues and the function returns an empty string.
3. Otherwise the script stops. The response written so far is discarded and replaced by `errorMessage`. An empty `errorMessage` discards the response and sends nothing.

Matching is **case-insensitive**. An empty prefix always matches. If `$suppressErrors[text]` was used before, `errorMessage` is replaced by that text.

## Related

- `$onlyIfMessageContains` — same guard, but tests that the text *contains* words.
- `$onlyIf` — for any other condition.
- `$checkContains` — inline true/false substring check.

## Examples

```bdfd
$startsWith[$message;!admin;This command must start with !admin]
$description[Welcome, admin!]
```

Several prefixes: `$startsWith[$message;!;?;Messages must start with ! or ?]` lets `!ping` and `?ping` through and stops `ping`.
