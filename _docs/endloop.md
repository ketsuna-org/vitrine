---
layout: doc
translation_key: docs
category: "Misc"
---

# $endLoop

Marks the end of a `$loop` block.

## Syntax

```text
$endLoop
```

## Parameters

This function has no parameters.

## Description

`$endLoop` is the closing tag for a loop block opened with `$loop[iterations]`. Everything between `$loop[...]` and `$endLoop` is the loop body and will be repeated the specified number of times.

Every `$loop` **must** be paired with exactly one `$endLoop`. Forgetting to close a loop results in a parse error.

## Examples

### Basic Loop

```bdfd
$loop[3]
This message repeats 3 times.
$endLoop
```

### Loop with Inner Logic

```bdfd
$var[total;0]
$loop[5]
$var[total;$sum[$var[total];10]]
$endLoop
Total: $var[total]
```

**Output:** `Total: 50`

### Nested Loops

```bdfd
$loop[2]
Row:
$loop[3]
  - Item
$endLoop
$endLoop
```

**Output:**
```
Row:
  - Item
  - Item
  - Item
Row:
  - Item
  - Item
  - Item
```

## Notes

- `$endLoop` takes no parameters — adding any is an error ("$endloop does not accept arguments.").
- A `$endLoop` with no open `$loop` is an error ("Unexpected $endLoop."), as is a `$loop` that is never closed ("Missing $endloop.").
- This closes only a `$loop` block, **not** the `$for` loop (which uses `$endFor`): mixing them is an error. See [$loop](/docs/loop/).
- The parser treats `$loop` / `$endLoop` as structural tokens, similar to `$if` / `$endif`.
- When nesting loops, ensure each `$loop` has its corresponding `$endLoop` in the correct order (LIFO: Last In, First Out).
