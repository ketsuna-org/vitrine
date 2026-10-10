---
layout: doc
title: $onlyIfMessageContains[]
translation_key: docs
category: "Control Flow"
function_name: onlyIfMessageContains
syntax: $onlyIfMessageContains[text;word1;(word2;...);errorMessage]
description: Stops command execution if the given text does not contain all the listed words (case-insensitive), and outputs the error message.
---
$onlyIfMessageContains is a convenience guard that checks whether a given text (usually `$message`) contains **all** the listed words. It is simpler and more focused than `$onlyIf` — you don't need to write a condition expression.

## Syntax

```
$onlyIfMessageContains[text;word1;(word2;...);errorMessage]
```

At least 3 arguments are required.

| Parameter | Description |
|---|---|
| `text` | Required. The text to search in (for example `$message`). |
| `word1;(word2;...)` | Required, at least one. The words that must all appear in `text`. |
| `errorMessage` | Required (the last argument, may be empty). Message output when at least one word is missing. |

## How It Works

1. The function checks that each word appears within `text`.
2. If **all** words are found → execution continues.
3. If **at least one** is missing → execution stops and `errorMessage` is output in place of the response (nothing is displayed if it is empty).

The matching is **case-insensitive** and works like a simple substring search. For example, `$onlyIfMessageContains[$message;hello;]` will match `Hello World` and `hello world`, but not `hell`.

## When to Use

- **Quick keyword gates**: require that the message mentions a specific word before processing.
- **Format validation**: ensure the message contains expected delimiters or markers (like `@` for mentions, `#` for channels, etc.).
- **Category filtering**: route commands based on message content tags.

## When Not to Use

- For complex conditions → use `$onlyIf` instead.
- For argument count checks → use `$argsCheck`.

## Comparison with Manual Check

Without `$onlyIfMessageContains`:
```
$if[$checkContains[$message;!admin]==false]
$stop
$endif
```

With `$onlyIfMessageContains` (cleaner; unlike `$checkContains`, the match is case-insensitive):
```
$onlyIfMessageContains[$message;!admin;]
```

## Examples

### Enforcing Specific Keywords

```bdfd
$onlyIfMessageContains[$message;help;support;❌ Please include both `help` and `support` in your inquiry!]
$title[Support Desk Ticket]
$description[Thank you for contacting support! Your message: *$message*]
$color[#5865F2]
```
