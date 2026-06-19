---
layout: doc
title: $embedSuppressErrors
translation_key: docs
category: "Control Flow"
function_name: embedSuppressErrors
syntax: $embedSuppressErrors
description: Suppresses error messages specifically related to embed rendering, preventing malformed embed errors from being displayed to the user.
---
$embedSuppressErrors is a focused suppression toggle that only affects errors related to embed construction and rendering. It prevents malformed or invalid embed configuration from producing visible error messages, while still allowing other types of errors to surface normally.

## How It Works

- When called, embed error suppression is enabled for the **current command execution**.
- Only errors originating from embed functions (missing fields, invalid values, formatting issues) are suppressed.
- All other runtime errors continue to be displayed normally — unless `$suppressErrors` is also active.

## When to Use

- **Dynamic embeds**: when embed content is built from variables or API responses that may sometimes be empty or invalid.
- **Optional embed fields**: when some embed properties are conditionally set and may fail in certain code paths.
- **Graceful degradation**: when you prefer embeds to silently fail rather than show error messages, perhaps because you have fallback text responses.

## Comparison with $suppressErrors

| Function | Scope |
|----------|-------|
| `$embedSuppressErrors` | Embed errors only |
| `$suppressErrors` | All runtime errors (including embed errors) |

If you call `$suppressErrors`, embed errors are already suppressed — you don't need `$embedSuppressErrors` in addition. Use `$embedSuppressErrors` alone when you want to hide embed rendering issues while still seeing other errors (useful during development).

## Example: Graceful Embed Fallback

```
$embedSuppressErrors
$title[$var[title]]
$description[$var[body]]
$footer[$var[footer]]

$if[$var[body]==""]
$sendMessage[⚠️ No data available for the embed.]
$endif
```

If the variables are empty, the embed may fail to render but the fallback text message still appears.
