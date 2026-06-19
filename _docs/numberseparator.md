---
layout: doc
title: $numberSeparator[]
translation_key: docs
category: "Math & Text"
function_name: numberSeparator
syntax: $numberSeparator[number]
description: Formats a number by adding thousands separators (commas) for readability.
---
# $numberSeparator — Format Number with Commas

`$numberSeparator` inserts thousands separators (commas) into a number to make it more human-readable. It handles integers and decimal values, leaving the decimal portion untouched.

## Syntax

```
$numberSeparator[number]
```

## Parameters

- **number** *(number or numeric string, required)* — The value to format.

## Return Value

- **Type**: `string`
- Returns the formatted number with commas. If the input is not a valid number, it may be returned unchanged.

## Usage

```
$numberSeparator[1000]          → "1,000"
$numberSeparator[50000]         → "50,000"
$numberSeparator[1234567890]    → "1,234,567,890"
$numberSeparator[999]           → "999"
$numberSeparator[1500.75]       → "1,500.75"
$numberSeparator[0]             → "0"
```

## Common Patterns

### Displaying Currency

```
$sendMessage[Your balance: $numberSeparator[$getUserVar[coins]] coins]
```
Output: `Your balance: 12,500 coins`

### Server Statistics

```
$sendMessage[Members: $numberSeparator[$membersCount]]
```
Output: `Members: 25,342`

### Scoreboards

```
$sendMessage[#$getTextSplitIndex - Score: $numberSeparator[$splitText]]
```

### Experience Points

```
$sendMessage[Level $getUserVar[level] — XP: $numberSeparator[$getUserVar[xp]]]
```

## Important Notes

- **Decimal handling**: The decimal part (after `.`) is preserved as-is without separators.
- **Negative numbers**: Formatting with negative sign is supported: `$numberSeparator[-5000]` → `"-5,000"`.
- **Non-numeric input**: If the input cannot be parsed as a number, it is returned unchanged.
- **Large numbers**: Handles arbitrarily large integers within BDFD's numeric limits.
