---
layout: doc
title: $replaceText[]
translation_key: docs
category: "Math & Text"
function_name: replaceText
syntax: $replaceText[input;search;replacement]
description: Replaces all occurrences of a search string with a replacement string in the given input text.
---
# $replaceText — Replace Text

`$replaceText` performs a global find-and-replace on a string. Every occurrence of the `search` substring is replaced with the `replacement` string. It is one of the most commonly used text manipulation functions in BDFD.

## Syntax

```
$replaceText[input;search;replacement]
```

## Parameters

- **input** *(string, required)* — The text to operate on. Can be a literal string, a variable, or any expression resolving to text.
- **search** *(string, required)* — The exact substring to find. Case-sensitive. Matches are literal, not regex.
- **replacement** *(string, required)* — The string to insert in place of each match. Pass an empty value to remove occurrences.

## Return Value

- **Type**: `string`
- Returns the modified text with all matches replaced.

## Evaluation Behavior

`$replaceText` can be evaluated either at **compile-time** or **runtime**, depending on its arguments:

- If all arguments are **static** (no variables or placeholders), replacement happens at compile time.
- If any argument contains **placeholders** (e.g., `$message`, `$getUserVar[...]`), it is evaluated at **runtime**.

## Usage

### Basic Replacement

```
$replaceText[I like cats;cats;dogs]  → "I like dogs"
```

### Removal (empty replacement)

```
$replaceText[remove-all-dashes;-;]  → "removealldashes"
```

### Placeholder Cleanup

```
$replaceText[$getUserVar[bio];\n; ]
```

### Chaining Replacements

```
$replaceText[$replaceText[$message;@;];#;]
```

This first removes all `@` characters, then all `#` characters.

## Common Patterns

### Censoring Words

```
$replaceText[$message;badword;\*\*\*\*]
```

### Normalizing Input

```
$replaceText[$toLowercase[$message];  ; ]
```
Removes double spaces after lowercasing.

### Formatting for Display

```
$var[clean;$replaceText[$getUserVar[rawText];\n;, ]]
```

## Important Notes

- **Case-sensitive**: `$replaceText[Hello;h;H]` will NOT replace — `h` ≠ `H`.
- **Global replacement**: All occurrences are replaced, not just the first.
- **Literal only**: No regex support. The search string is matched exactly.
- **Order matters in chaining**: Nest `$replaceText` calls carefully when doing multiple replacements, as earlier replacements may affect later ones.
