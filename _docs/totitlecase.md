---
layout: doc
title: $toTitlecase[]
translation_key: docs
category: "Math & Text"
function_name: toTitlecase
syntax: $toTitlecase[text]
description: Converts the first letter of each word to uppercase and the rest to lowercase.
---
# $toTitlecase — Convert to Title Case

`$toTitlecase` capitalizes the first letter of every word and lowercases the rest. Words are delimited by the **space character** only. This is useful for formatting names, titles, or display text.

## Syntax

```
$toTitlecase[text]
```

## Parameters

- **text** *(string, required)* — The string to convert to title case.

## Return Value

- **Type**: `string`
- Returns the text with each word's first character in uppercase and the rest in lowercase.

## Usage

```
$toTitlecase[hello world]       → "Hello World"
$toTitlecase[jOHN dOE]          → "John Doe"
$toTitlecase[THE GREAT GATSBY]  → "The Great Gatsby"
$toTitlecase[$message]          → user message in title case
```

## Common Patterns

### Formatting User Names

```
$setUserVar[displayName;$toTitlecase[$message]]
```

### Displaying Stored Data Nicely

```
$sendMessage[Welcome, $toTitlecase[$getUserVar[name]]!]
```

### Normalizing Database Entries

```
$var[city;$toTitlecase[$getUserVar[city]]]
```

Transforms `"new york"` → `"New York"`, `"LOS ANGELES"` → `"Los Angeles"`.

## Important Notes

- **Word boundaries**: the text is cut only at the space character (`U+0020`). A hyphen, an apostrophe, a tab or a line break does not start a new word: `$toTitlecase[hello-world o'neil]` → `Hello-world O'neil`, and in a two-line text only the first word of the whole text is capitalized.
- Consecutive spaces are kept as they are.
- **All subsequent letters are lowered**: `"mCDONALD"` → `"Mcdonald"`. For proper name casing, additional logic may be needed.
- **Accented letters** are converted too: `$toTitlecase[école élève]` → `École Élève`.
- Exactly one argument is required; `$toTitlecase[]` returns an empty string.

## Examples

### Formatting Text to Title Case

```bdfd
$title[Title Case Formatter]
$description[Formatted title: **$toTitlecase[$message]**]
$color[#5865F2]
```
