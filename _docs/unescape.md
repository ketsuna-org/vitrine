---
layout: doc
title: $unEscape
translation_key: docs
category: "Math & Text"
function_name: unEscape
syntax: $unEscape[text]
description: Returns its text unchanged. Its only effect is inside $randomText, where semicolons in the text become option separators.
---
# $unEscape

The function `$unEscape[]` returns the text it receives **unchanged**. It does **not** convert `\n`, `\t` or any other escape sequence into a real character.

## Syntax

```
$unEscape[text]
```

## Parameters

| Parameter | Description |
|---|---|
| `text` | The text to return. Required, exactly one argument; two or more arguments are refused ("Invalid argument count"). |

## Return Value

- **Type**: String
- The same text as the argument: `$unEscape[abc]` → `abc`, `$unEscape[]` → empty.

## Behavior

- Outside `$randomText[]`, `$unEscape[x]` is the same as `x`.
- Inside `$randomText[]`, when an argument contains an `$unEscape[]` call, every `;` in the text returned by `$unEscape[]` is treated as an option separator. Text written next to the call stays attached to the neighbouring option: `$randomText[x$unEscape[a\;b]y]` chooses between `xa` and `by`.
- Other functions are not affected: the text they receive from `$unEscape[]` keeps its semicolons.
- The `\;`, `\[`, `\]` and `\$` sequences are handled by the script parser on literal text (the backslash is removed and the character is kept), whether or not `$unEscape[]` is used. `\n` is not an escape sequence of the engine: it stays as the two characters `\` and `n`.

## Examples

### Several options in one text (with $randomText)

```bdfd
$randomText[$unEscape[red\;green\;blue]]
```

This chooses randomly between `red`, `green` and `blue`, for example when the list of options comes from a single string.

### Plain pass-through

```bdfd
$sendMessage[$unEscape[Hello $username]]
```

This sends the same text as `$sendMessage[Hello $username]`.

## Notes

- `$disableSpecialEscaping` is accepted for compatibility but does nothing in this engine.
- To encode or decode URL text, use `$url[]`.
