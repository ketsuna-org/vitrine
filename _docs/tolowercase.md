---
layout: doc
title: $toLowercase[]
translation_key: docs
category: "Math & Text"
function_name: toLowercase
syntax: $toLowercase[text]
description: Converts all characters in the given text to lowercase.
---
# $toLowercase — Convert to Lowercase

`$toLowercase` transforms all uppercase characters in a string to their lowercase equivaslows. It's commonly used to normalize user input for case-insensitive comparisons.

## Syntax

```
$toLowercase[text]
```

## Parameters

- **text** *(string, required)* — The string to convert.

## Return Value

- **Type**: `string`
- Returns the input text with all letters converted to lowercase.
- Non-alphabetic characters (numbers, symbols, spaces) remain unchanged.

## Evaluation Behavior

- **Static text** (no placeholders): Converted at compile time.
- **Contains placeholders** (e.g., `$message`, variables): Evaluated at runtime.

## Usage

```
$toLowercase[HELLO]     → "hello"
$toLowercase[Hello]     → "hello"
$toLowercase[123 ABC]   → "123 abc"
$toLowercase[$message]  → user's message in lowercase
```

## Common Patterns

### Case-Insensitive Command Detection

```
$if[$toLowercase[$splitText[0]]==!ping]
  $sendMessage[Pong!]
$endif
```

This matches `!ping`, `!PING`, `!Ping`, etc.

### Normalizing User Input for Storage

```
$setUserVar[name;$toLowercase[$message]]
```

### Case-Insensitive Keyword Check

```
$if[$checkContains[$toLowercase[$message];help]==true]
  $sendMessage[Here's the help menu...]
$endif
```

## Important Notes

- **Locale-independent**: Basic ASCII lowercasing is applied. Behavior with non-ASCII characters (accented letters, etc.) may vary.
- **Only letters**: Digits, punctuation, and whitespace pass through unchanged.
- **Combine with $replaceText**: Use `$toLowercase` before `$replaceText` for consistent matching.
