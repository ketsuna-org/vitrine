---
layout: doc
title: $charCount[]
translation_key: docs
category: "Math & Text"
function_name: charCount
syntax: $charCount[text]
description: Counts the number of characters in the given text.
---
# $charCount — Count Characters

`$charCount` returns the number of characters in a string. Every character counts — letters, digits, spaces, punctuation, and newlines. It is useful for validation, truncation decisions, and displaying string length to users.

## Syntax

```
$charCount[text]
```

## Parameters

- **text** *(string, required)* — The text to count.

## Return Value

- **Type**: `string` (representing a number)
- Returns the total character count as a numeric string: `"5"`, `"42"`, `"0"`, etc.

## Usage

```
$charCount[Hello]           → "5"
$charCount[Hello World]     → "11" (space counts)
$charCount[A\nB]            → "3"  (newline counts as 1)
$charCount[]                → "0"
$charCount[$message]        → character count of user's message
```

## Common Patterns

### Character Limit Enforcement

```
$if[$charCount[$message]>2000]
  $sendMessage[Your message exceeds Discord's 2000 character limit!]
  $stop
$endif
```

### Progress Display

```
$sendMessage[Bio: $charCount[$getUserVar[bio]]/500 characters used]
```

### Input Validation

```
$if[$charCount[$message]<10]
  $sendMessage[Please write at least 10 characters.]
$endif
```

### Conditional Truncation

```
$if[$charCount[$text]>100]
  $var[text;$cropText[$text;100]]
$endif
```

## Important Notes

- **Unicode**: Multi-byte characters like emojis may count as more than 1 character depending on the BDFD runtime.
- **Newlines**: `\n` counts as 1 character.
- **Empty input**: Returns `"0"`, not an error.
- **Return type**: The return value is a string, but can be used in `$math` or `$checkCondition` for numeric comparisons.
