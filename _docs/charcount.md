---
layout: doc
title: $charCount[]
translation_key: docs
category: "Math & Text"
function_name: charCount
syntax: $charCount[text]
description: Counts the number of characters in the given text.
parameters:
  - name: text
    type: string
    required: true
    description: The text whose characters are to be counted.
returns:
  type: string (number)
  description: The total number of characters in the text, returned as a numeric string. Includes spaces, punctuation, and newlines.
related:
  - linesCount
  - cropText
  - textSplit
examples:
  - title: Basic count
    code: |
      $charCount[Hello]
      Result: "5"
  - title: Count with spaces
    code: |
      $charCount[Hello World]
      Result: "11"
  - title: Validate message length
    code: |
      $if[$charCount[$message]>100]
        $sendMessage[Your message is too long ($charCount chars). Max is 100.]
      $endif
  - title: Empty string
    code: |
      $charCount[]
      Result: "0"
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
