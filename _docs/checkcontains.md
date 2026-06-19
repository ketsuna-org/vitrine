---
layout: doc
title: $checkContains
translation_key: docs
category: "Control Flow"
function_name: checkContains
syntax: $checkContains[text;search]
description: Checks whether a string contains a substring and returns "true" or "false".
---
# $checkContains — Inline Substring Check

`$checkContains` tests whether a specified substring exists within a larger string. It is a compile-time-optimized function that returns the string `"true"` or `"false"`. This is one of the most commonly used utility functions in BDFD for command detection, keyword filtering, and data validation.

## How It Works

`$checkContains[text;search]` performs a **case-sensitive** substring search:

- `$checkContains[Hello World;World]` → `"true"`
- `$checkContains[Hello World;world]` → `"false"` (case mismatch)
- `$checkContains[Hello World;xyz]` → `"false"`
- `$checkContains[Hello;]` → `"true"` (empty string is contained in every string)

## Compile-Time Optimization

When both `text` and `search` are literal constants, the check is evaluated at **compile time** and the result is baked in. This means keyword-based command routing can be extremely fast — the parser pre-computes which branch to take before the script ever runs.

When either argument contains a variable reference or function call, evaluation falls back to runtime.

## Use in $if Conditions

`$checkContains` is most commonly used inside `$if` conditions to route commands based on user input:

```
$if[$checkContains[$message;ping]==true]
  Pong!
$endif
```

Always compare with `==true` or `==false` when using inside `$if`.

## Case-Insensitive Searching

`$checkContains` is case-sensitive by design. To perform case-insensitive checks, convert both sides to lowercase:

```
$checkContains[$toLowercase[$message];$toLowercase[Admin]]
```

## Common Use Cases

- **Command detection**: Check if a message contains a trigger word.
- **Inventory checks**: See if an item name appears in a list stored as a string.
- **Filtering**: Validate that user input contains expected content.
- **Multi-keyword matching**: Combine with `$or` to check for any of several keywords.

## Common Pitfalls

- **Case sensitivity**: "Hello" does not contain "hello". Use `$toLowercase` if case-insensitive matching is needed.
- **Partial matches**: `$checkContains[sword;word]` returns `"true"`. Use exact equality checks or delimitrs if you need whole-word matching.
- **Empty search string**: An empty needle always returns `"true"`. Guard against empty user input if it matters.
- **Type coercion**: Both arguments are treated as strings. If you pass a number, it is converted to its string representation first.
