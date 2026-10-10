---
layout: doc
title: $linesCount[]
translation_key: docs
category: "Math & Text"
function_name: linesCount
syntax: $linesCount[text]
description: Counts the lines of a text, i.e. the number of line breaks (LF) plus one. An empty text is an error.
---
# $linesCount — Count Lines

`$linesCount` returns the number of lines in a string. Lines are separated by the line feed character (LF, `U+000A`): the result is the number of LF characters plus one. A single word with no line break counts as 1 line.

## Syntax

```
$linesCount[text]
```

## Parameters

- **text** *(string, required)* — The text whose lines to count. It must not be empty: an empty text raises the error "Text must not be empty.". Exactly one argument is accepted.

## Return Value

- **Type**: `string` (representing a number)
- Returns the line count: number of line feeds + 1.

## Usage

```
$linesCount[hello]          → "1"
$linesCount[ ]              → "1"
```

With actual line breaks in code:

```
$linesCount[First line
Second line
Third line]
→ "3"
```

## Common Patterns

### Limit Multi-Line Input

```bdfd
$if[$linesCount[$message]>10]
  $sendMessage[Your message has too many lines (max 10).]
  $stop
$endif
```

### Code Block Validation

```bdfd
$if[$linesCount[$getUserVar[code]]>50]
  $sendMessage[Code too long — max 50 lines.]
$endif
```

### Display Line Count

```bdfd
$sendMessage[Your submission: $linesCount[$message] lines, $charCount[$message] characters]
```

## Important Notes

- **Trailing line break**: a trailing LF starts another (empty) line: `a` followed by a line break counts `2`.
- **`{B}n` is not a line break**: the engine does not convert the two characters `{B}n` into a line feed; only real line breaks are counted.
- **CR alone** (`U+000D`) is not counted; a Windows `CR LF` pair counts once, for its LF.
- **Empty text is an error**, not `0`. When the text may be empty (for example an empty `$message`), check it first; a non-empty text always returns at least `1`.
- **Return type**: the value is text that can be compared numerically in `$if[]` conditions.

## Examples

### Counting Lines in User Input

```bdfd
$title[Line Counter]
$description[Your text contains **$linesCount[$message]** lines of code.]
$color[#5865F2]
```
