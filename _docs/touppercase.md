---
layout: doc
title: $toUppercase[]
translation_key: docs
category: "Math & Text"
function_name: toUppercase
syntax: $toUppercase[text]
description: Converts all characters in the given text to uppercase.
---
# $toUppercase — Convert to Uppercase

`$toUppercase` transforms all lowercase characters in a string to their uppercase equivalents. It's commonly used for emphasis, formatting codes, or case-insensitive comparisons.

## Syntax

```
$toUppercase[text]
```

## Parameters

- **text** *(string, required)* — The string to convert.

## Return Value

- **Type**: `string`
- Returns the input text with all letters converted to uppercase.
- Non-alphabetic characters (numbers, symbols, spaces) remain unchanged.
- Exactly one argument is required (`$toUppercase` without brackets or with two arguments is refused: "Invalid argument count"); `$toUppercase[]` returns an empty string.

## Usage

```
$toUppercase[hello]     → "HELLO"
$toUppercase[Hello]     → "HELLO"
$toUppercase[123 abc]   → "123 ABC"
$toUppercase[$message]  → user's message in uppercase
```

## Common Patterns

### Code Formatting

```
$toUppercase[$getUserVar[promoCode]]
```

Ensures promo codes are stored and compared in uppercase.

### Emphasis

```
$sendMessage[$toUppercase[Warning: $message]]
```

### Case-Insensitive Comparisons (Alternative)

```
$if[$toUppercase[$getUserVar[role]]==ADMIN]
  $sendMessage[Welcome, admin!]
$endif
```

## Important Notes

- **Not limited to ASCII**: accented letters are converted too: `$toUppercase[école]` → `ÉCOLE`.
- **Only letters**: Digits, punctuation, and whitespace pass through unchanged.
- **Often paired with $toLowercase**: Choose one convention and stick with it for comparisons.

## Examples

### Converting Text to Uppercase

```bdfd
$title[SHOUTING FORMATTER]
$description[Uppercase: **$toUppercase[$message]**]
$color[#5865F2]
```
