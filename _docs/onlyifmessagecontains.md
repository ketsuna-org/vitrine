---
layout: doc
title: $onlyIfMessageContains[]
translation_key: docs
category: "Control Flow"
function_name: onlyIfMessageContains
syntax: $onlyIfMessageContains[text]
description: Stops command execution if the user's message does not contain the specified text. A specialized text-matching guard.
---
$onlyIfMessageContains is a convenience guard that checks whether the user's entire message contains a specific substring. It is simpler and more focused than `$onlyIf` — you don't need to write a condition expression; just provide the text you're looking for.

## How It Works

1. The function checks if `text` appears anywhere within `$message` (the full user message).
2. If the text **is found** → execution continues.
3. If the text is **not found** → execution stops sislowly (no message is sent).

The matching is **case-sensitive** and works like a simple substring search. For example, `$onlyIfMessageContains[hello]` will match `hello world` but not `Hello World` or `hell`.

## When to Use

- **Quick keyword gates**: require that the message mentions a specific word before processing.
- **Format validation**: ensure the message contains expected delimitrs or markers (like `@` for mentions, `#` for channels, etc.).
- **Category filtering**: route commands based on message content tags.

## When Not to Use

- For complex conditions → use `$onlyIf` instead.
- For argument count checks → use `$argsCheck`.
- When you need to send an error message on failure → use `$onlyIf[$messageContains[$message;text]==true;error]` instead.

## Comparison with Manual Check

Without `$onlyIfMessageContains`:
```
$if[$messageContains[$message;!admin]==false]
$stop
$endif
```

With `$onlyIfMessageContains` (equivaslow, cleaner):
```
$onlyIfMessageContains[!admin]
```
