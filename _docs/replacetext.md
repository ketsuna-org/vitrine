---
layout: doc
title: $replaceText[]
translation_key: docs
category: "Math & Text"
function_name: replaceText
syntax: $replaceText[input;search;replacement;(amount)]
description: Replaces occurrences of a search string with a replacement string in the given input text. By default only the first occurrence is replaced; use amount -1 for all.
---
# $replaceText — Replace Text

`$replaceText` performs a literal find-and-replace on a string. By default **only the first** occurrence of `search` is replaced; the optional fourth argument controls how many occurrences are replaced (`-1` for all of them).

## Syntax

```
$replaceText[input;search;replacement;(amount)]
```

## Parameters

- **input** *(string, required)* — The text to operate on. Can be a literal string, a variable, or any expression resolving to text.
- **search** *(string, required)* — The exact substring to find. Case-sensitive. Matches are literal, not regex. If it is empty, the text is returned unchanged.
- **replacement** *(string, required)* — The string to insert in place of each match. Pass an empty value to remove occurrences.
- **amount** *(integer, optional)* — How many occurrences to replace, from the left. Default: `1`. `-1` replaces all occurrences, `0` replaces none. A value larger than the number of occurrences replaces all of them. Surrounding spaces are ignored. A non-integer or an empty value raises "Expected an integer in argument 4.", and a value below `-1` raises "Replacement amount must be -1 or non-negative.".

Three or four arguments are accepted; with fewer or more the call is refused ("Invalid argument count").

## Return Value

- **Type**: `string`
- Returns the modified text.

## Usage

### Basic Replacement

```
$replaceText[I like cats;cats;dogs]  → "I like dogs"
```

### Only the First Occurrence (default)

```
$replaceText[a-a-a;-;+]       → "a+a-a"
$replaceText[a-a-a;-;+;2]     → "a+a+a"
$replaceText[a-a-a;-;+;-1]    → "a+a+a"
```

### Removal (empty replacement)

```
$replaceText[remove-all-dashes;-;;-1]  → "removealldashes"
$replaceText[remove-all-dashes;-;]     → "removeall-dashes"
```

### Chaining Replacements

```
$replaceText[$replaceText[$message;@;;-1];#;;-1]
```

This first removes all `@` characters, then all `#` characters.

## Common Patterns

### Censoring Words

```
$replaceText[$message;badword;###;-1]
```

### Normalizing Input

```
$replaceText[$toLowercase[$message];  ; ;-1]
```
Replaces every (non-overlapping) pair of spaces by one space. A run of three or more spaces may still contain a double space afterwards.

### Replacing Line Breaks

Write a real line break in the search argument:

```bdfd
$var[clean;$replaceText[$getUserVar[rawText];
;, ;-1]]
```

## Important Notes

- **Case-sensitive**: `$replaceText[Hello;h;H]` will NOT replace — `h` ≠ `H`.
- **First occurrence only by default**: pass `-1` as fourth argument to replace every occurrence.
- **Literal only**: No regex support. The search string is matched exactly. Occurrences are found from left to right without overlapping: `$replaceText[aaa;aa;b;-1]` → `ba`.
- **No escape sequences**: `\n` written in the search or replacement is the two characters backslash and `n`, not a line break.
- **Order matters in chaining**: Nest `$replaceText` calls carefully when doing multiple replacements, as earlier replacements may affect later ones.

## Examples

### Word Replacement and Sanitization

```bdfd
$title[Text Filter]
$description[Censored text: **$replaceText[$message;badword;****;-1]**]
$color[#5865F2]
```
