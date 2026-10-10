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

`$charCount` returns the length of a string. Every character counts — letters, digits, spaces (also leading and trailing ones), punctuation, and line breaks. It is useful for validation, truncation decisions, and displaying string length to users.

## Syntax

```
$charCount[text]
```

## Parameters

- **text** *(string, required)* — The text to count. Exactly one argument (`$charCount[a;b]` and `$charCount` without brackets are refused: "Invalid argument count").

## Return Value

- **Type**: `string` (representing a number)
- Returns the total character count as a numeric string: `"5"`, `"42"`, `"0"`, etc.

## Usage

```
$charCount[Hello]           → "5"
$charCount[Hello World]     → "11" (space counts)
$charCount[ a ]             → "3"  (spaces are not trimmed)
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
$if[$charCount[$message]>100]
  $var[text;$cropText[$message;100;...]]
$endif
```

## Important Notes

- **Unicode**: the length is counted in UTF-16 code units: `é` counts 1, but an emoji such as 😀 counts 2 (tested). `$cropText` counts such an emoji as one character, so the two functions can disagree.
- **Line breaks**: a real line break counts as 1 character.
- **Empty input**: Returns `"0"`, not an error.
- **Return type**: the value is text made of digits, usable in numeric comparisons such as `$if[$charCount[$message]>10]`.

## Examples

### Measuring Message Length

```bdfd
$title[Message Character Count]
$description[Your message contains **$charCount[$message]** characters.]
$color[#5865F2]
```
