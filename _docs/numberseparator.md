---
layout: doc
title: $numberSeparator[]
translation_key: docs
category: "Math & Text"
function_name: numberSeparator
syntax: $numberSeparator[number;(separator)]
description: Formats an integer by inserting a separator (comma by default) between groups of three digits.
---
# $numberSeparator — Format Number with Separators

`$numberSeparator` inserts a separator between groups of three digits of an integer to make it more human-readable. The separator is `,` unless you give another one.

## Syntax

```
$numberSeparator[number;(separator)]
```

## Parameters

- **number** *(integer, required)* — The value to format. Leading and trailing spaces are ignored; an optional `+` or `-` sign is accepted. A decimal number (`1234.5`), text or an empty value raises the error "Number must be an integer.".
- **separator** *(text, optional)* — The text inserted between the groups of three digits. Default: `,`. An empty separator also gives `,`. Any text is accepted, including several characters.

## Return Value

- **Type**: `string`
- Returns the digits grouped by three from the right, joined by the separator, with the `-` sign kept for negative numbers.

## Usage

```
$numberSeparator[1000]          → "1,000"
$numberSeparator[1234567890]    → "1,234,567,890"
$numberSeparator[999]           → "999"
$numberSeparator[-1234567]      → "-1,234,567"
$numberSeparator[1234567;.]     → "1.234.567"
$numberSeparator[1234567; ]     → "1 234 567"
$numberSeparator[0]             → "0"
```

## Common Patterns

### Displaying Currency

```
$sendMessage[Your balance: $numberSeparator[$getUserVar[coins]] coins]
```
Output: `Your balance: 12,500 coins`

### Experience Points

```
$sendMessage[Level $getUserVar[level] — XP: $numberSeparator[$getUserVar[xp]]]
```

## Important Notes

- **Integers only**: decimal numbers are not formatted; they raise an error. Remove the decimal part first, for example with `$floor[]` or `$round[]`.
- **Negative numbers**: the sign is kept: `$numberSeparator[-5000]` → `"-5,000"`.
- **Non-numeric input**: it is not returned unchanged; it raises "Number must be an integer.".
- **Large numbers**: integers of any size are accepted.

## Examples

### Formatting Numbers with Thousands Separators

```bdfd
$title[Bank Vault Balance]
$description[Total reserves: **$numberSeparator[1250000;,]**]
$color[#57F287]
```
