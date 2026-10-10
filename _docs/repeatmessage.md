---
layout: doc
title: $repeatMessage[]
translation_key: docs
category: "Math & Text"
function_name: repeatMessage
syntax: $repeatMessage[count;message]
description: Returns the given text repeated count times (0 to 10), with nothing between the copies. It does not send anything by itself.
---
# $repeatMessage — Repeat a Text

`$repeatMessage` returns the `message` text repeated `count` times, concatenated one after the other. It is an ordinary text function: it **sends nothing** on its own, the result becomes part of the text where the call is written.

## Syntax

```
$repeatMessage[count;message]
```

## Parameters

- **count** *(integer, required)* — How many times the text is repeated. An integer from `0` to `10` (surrounding spaces are ignored). A non-integer raises "Expected an integer in argument 1."; a value outside `0..10` raises "Repeat amount must be between 0 and 10.".
- **message** *(string, required)* — The text to repeat. It is evaluated once and not trimmed.

## Behavior

- Returns `message` concatenated `count` times, without separator or line break: `$repeatMessage[3;Hello]` → `HelloHelloHello`.
- `count` of `0` gives an empty string.
- Exactly two arguments are required.
- Because it is only a text function, the repeated text is sent in the **same** message as the rest of the script output; it does not create several Discord messages.

## Usage

```
$repeatMessage[3;Hello]    → "HelloHelloHello"
$repeatMessage[2;ab ]      → "ab ab "
$repeatMessage[0;x]        → "" (empty)
```

## Common Patterns

### Repeated Pattern

```bdfd
$repeatMessage[5;🎉]
```

### Visual Separator

```bdfd
$description[$repeatMessage[10;=-]]
```

### Repeat With a Line Break

To put each copy on its own line, include the line break in the text:

```bdfd
$repeatMessage[3;Hello
]
```

## Important Notes

- **Maximum 10**: for more copies, nest calls (`$repeatMessage[10;$repeatMessage[10;x]]` gives 100).
- **Evaluated once**: functions inside `message` are executed once, then the result is copied: `$repeatMessage[3;$sendMessage[x]]` sends one message `x` (not three) and returns an empty text.

## Examples

### Repeating Text Patterns

```bdfd
$title[Repeating Announcement]
$description[$repeatMessage[3;Echo! ]]
$color[#5865F2]
```
