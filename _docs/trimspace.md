---
layout: doc
title: $trimSpace[]
translation_key: docs
category: "Math & Text"
function_name: trimSpace
syntax: $trimSpace[text]
description: Removes leading and trailing whitespace (spaces, tabs, newlines) from the given text.
---
# $trimSpace — Trim Whitespace

`$trimSpace` strips leading and trailing whitespace characters from a string. Internal whitespace (between words) is preserved. This is essential for cleaning user input and normalizing data.

## Syntax

```
$trimSpace[text]
```

## Parameters

- **text** *(string, required)* — The string to trim.

## Return Value

- **Type**: `string`
- Returns the text with all leading and trailing whitespace removed.
- Whitespace includes spaces, tabs, line breaks, carriage returns and other Unicode whitespace such as the non-breaking space.
- `\n` and `\t` written in a script are **not** converted to real line breaks or tabs by the engine; they stay as two characters.

## Usage

```
$trimSpace[  hello  ]        → "hello"
$trimSpace[  foo bar  ]      → "foo bar"
$trimSpace[  text  ]        → "text"
$trimSpace[   ]              → "" (empty string)
$trimSpace[$message]         → user input with no accidental spacing
```

## Common Patterns

### Sanitizing User Input

```
$var[clean;$trimSpace[$message]]
$if[$var[clean]==]
  $sendMessage[Please type something!]
$endif
```

### Cleaning Variable Values

```
$setUserVar[name;$trimSpace[$message]]
```

Prevents storing `"  John  "` when the user types extra spaces.

### Before Validation

```
$var[input;$trimSpace[$toLowercase[$message]]]
$if[$var[input]==!help]
 ...show help...
$endif
```

## Important Notes

- **Preserves internal spaces**: Only leading and trailing whitespace is removed. `"hello   world"` stays `"hello   world"`.
- **Empty result**: If the text is all whitespace, returns an empty string.
- **Often combined**: Use `$trimSpace` with `$toLowercase` for robust input normalization.
- Exactly one argument is required ("Invalid argument count" otherwise); `$trimContent[]` does the same job.

## Examples

### Trimming Surrounding Whitespace

```bdfd
$title[Trimmed String]
$description[Cleaned input: `**$trimSpace[$message]**`]
$color[#5865F2]
```
