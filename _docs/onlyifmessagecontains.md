---
layout: doc
title: $onlyIfMessageContains[]
translation_key: docs
category: "Control Flow"
function_name: onlyIfMessageContains
syntax: $onlyIfMessageContains[text;word1;(word2;...);errorMessage]
description: Stops command execution if the given text does not contain all the listed words (case-insensitive), and outputs the error message.
---

# $onlyIfMessageContains[] — Keyword Guard

`$onlyIfMessageContains` is a guard that checks whether a text (usually `$message`) contains **all** the listed words. If one is missing, the script stops and the last argument replaces the response.

## Syntax

```text
$onlyIfMessageContains[text;word1;(word2;...);errorMessage]
```

At least 3 arguments are required (`text`, one word, `errorMessage`).

| Parameter | Description |
|---|---|
| `text` | Required. The text to search in (for example `$message`). |
| `word1;(word2;...)` | Required, at least one. The words that must all appear in `text`. |
| `errorMessage` | Required (the last argument, may be empty). Replaces the response when at least one word is missing. |

## How It Works

1. The text and each word are converted to lower case, then each word is searched in the text as a substring.
2. If **all** the words are found, the script continues and the function returns an empty string.
3. If **at least one** is missing, the script stops. The response written so far (text, embeds, components) is discarded and replaced by `errorMessage`. An empty `errorMessage` discards the response and sends nothing.

Matching is **case-insensitive** and is a plain substring search: `$onlyIfMessageContains[$message;hello;no]` lets `Hello World` and `say hello` through, and stops `hell`.

If `$suppressErrors[text]` was used before, `errorMessage` is replaced by that text.

## When to Use

- Quick keyword gates: require that the message mentions specific words before processing.
- Format validation: ensure the message contains expected markers.

## When Not to Use

- For complex conditions, use `$onlyIf`.
- For argument count checks, use `$argsCheck`.

## Comparison with a Manual Check

```text
$if[$checkContains[$message;!admin]==false]
$stop
$endif
```

With `$onlyIfMessageContains` (unlike `$checkContains`, the match is case-insensitive):

```text
$onlyIfMessageContains[$message;!admin;]
```

## Examples

### Enforcing Specific Keywords

```bdfd
$onlyIfMessageContains[$message;help;support;Please include both help and support in your inquiry!]
$title[Support Desk Ticket]
$description[Thank you for contacting support! Your message: *$message*]
$color[#5865F2]
```
