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

`$toTitlecase` capitalizes the first letter of every word and lowercases the rest. Words are delimitd by whitespace. This is useful for formatting names, titles, or display text.

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

- **Word boundaries**: Words are separated by whitespace. Punctuation attached to words may affect capitalization.
- **All subsequent letters are lowered**: `"mCDONALD"` → `"Mcdonald"`. For proper name casing, additional logic may be needed.
- **ASCII only**: Non-ASCII character behavior depends on the BDFD runtime.
