---
layout: doc
title: $cropText[]
translation_key: docs
category: "Math & Text"
function_name: cropText
syntax: $cropText[text;maxLength;(suffix)]
description: "Truncates text to a maximum length and optionally appends a suffix (default: \"...\") when truncation occurs."
---
# $cropText — Truncate Text

`$cropText` limits a string to a maximum character length. If the text exceeds the limit, it is cut at `maxLength` characters and a suffix (default `"..."`) is appended to indicate truncation. If the text is within the limit, it is returned unchanged.

## Syntax

```
$cropText[text;maxLength;(suffix)]
```

## Parameters

- **text** *(string, required)* — The source text.
- **maxLength** *(integer, required)* — The maximum character count. Text longer than this is truncated.
- **suffix** *(string, optional)* — String appended after truncation. Default: `"..."`. Pass an empty value for a hard cut with no indicator.

## Return Value

- **Type**: `string`
- If `text.length ≤ maxLength`: returns `text` unchanged (no suffix).
- If `text.length > maxLength`: returns the first `maxLength` characters + `suffix`.

## Usage

```
$cropText[Hello World;5]       → "Hello..."
$cropText[Hello World;20]      → "Hello World" (no truncation)
$cropText[Hello World;5;~]     → "Hello~"
$cropText[Hello World;3;]      → "Hel" (hard cut)
```

## Common Patterns

### Embed Field Truncation

Discord embed fields have character limits. Use `$cropText` to ensure compliance:

```
$cropText[$getUserVar[bio];1024]
```

### Message Preview

Show a snippet of a long message:

```
$sendMessage[Latest post: $cropText[$getUserVar[lastPost];100; [...]]
```

### Title Formatting

```
$var[title;$cropText[$message;50]]
```

## Important Notes

- **Suffix is not included in maxLength**: The `maxLength` value controls how many characters of the *original text* are kept. The suffix is added on top. For example, `$cropText[abcdef;3;...]` produces `"abc..."` (6 total characters).
- **Hard cut with empty suffix**: `$cropText[text;5;]` with an empty third argument simply returns the first 5 characters.
- **Works with numbers/symbols**: All characters count equally — no special handling of Unicode or emoji width.
