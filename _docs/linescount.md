---
layout: doc
title: $linesCount[]
translation_key: docs
category: "Math & Text"
function_name: linesCount
syntax: $linesCount[text]
description: Counts the number of lines in the given text. Lines are separated by newline characters.
---
# $linesCount — Count Lines

`$linesCount` returns the number of lines in a string. A line is defined as text terminated by a newline character (`\n`). Even a single word with no newline counts as 1 line.

## Syntax

```
$linesCount[text]
```

## Parameters

- **text** *(string, required)* — The text whose lines to count.

## Return Value

- **Type**: `string` (representing a number)
- Returns the line count. An empty string returns `"0"`. A string without newlines returns `"1"`.

## Usage

```
$linesCount[hello]          → "1"
$linesCount[line1\nline2]   → "2"
$linesCount[]               → "0"
```

With actual newlines in code:

```
$linesCount[First line
Second line
Third line]
→ "3"
```

## Common Patterns

### Limit Multi-Line Input

```
$if[$linesCount[$message]>10]
  $sendMessage[Your message has too many lines (max 10).]
  $stop
$endif
```

### Code Block Validation

```
$if[$linesCount[$getUserVar[code]]>50]
  $sendMessage[Code too long — max 50 lines.]
$endif
```

### Display Line Count

```
$sendMessage[Your submission: $linesCount[$message] lines, $charCount[$message] characters]
```

## Important Notes

- **Trailing newline**: A trailing `\n` may or may not create an additional empty line depending on the BDFD runtime. Test your specific version.
- **Empty string = 0**: Different from a single non-empty line which returns `"1"`.
- **Return type**: The return value is a string, compatible with numeric comparisons in `$checkCondition` and `$math`.
