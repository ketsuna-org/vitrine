---
layout: doc
translation_key: docs
category: "Misc"
---

# $endLoop

Marks the end of a `$loop` block.

## Syntax

```
$endLoop
```

## Parameters

This function has no parameters.

## Description

`$endLoop` is the closing tag for a loop block opened with `$loop[iterations]`. Everything between `$loop[...]` and `$endLoop` is the loop body and will be repeated the specified number of times.

Every `$loop` **must** be paired with exactly one `$endLoop`. Forgetting to close a loop results in a parse error.

## Examples

### Basic Loop

```
$loop[3]
This message repeats 3 times.
$endLoop
```

### Loop with Inner Logic

```
$var[total;0]
$loop[5]
$var[total;$sum[$total;10]]
$endLoop
Total: $total
```

**Output:** `Total: 50`

### Nested Loops

```
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

- `$endLoop` takes no parameters — adding any will cause a parse error.
- This closes only the legacy `$loop` block, **not** the `$for` loop (which uses `$endFor`).
- The parser treats `$loop` / `$endLoop` as structural tokens, similar to `$if` / `$endif`.
- When nesting loops, ensure each `$loop` has its corresponding `$endLoop` in the correct order (LIFO: Last In, First Out).
