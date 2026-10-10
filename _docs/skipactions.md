---
layout: doc
title: $skipActions
translation_key: docs
category: "Control Flow"
function_name: skipActions
syntax: $skipActions[count]
description: Skips a specified number of subsequent actions in the current execution block.
---

# $skipActions — Skip N Actions

`$skipActions[count]` skips the next `count` actions of the current block, then execution resumes.

## Syntax

```text
$skipActions[count]
```

## What counts as an action

The engine numbers the **function calls** of the current block (the statements of the script or of an `$if` branch, a loop body, ...). Each of these counts as one action:

- a function call such as `$sendMessage[...]`, `$var[...]` (and `$skipActions` itself);
- a whole `$if ... $endif`, `$for ... $endFor` or `$try ... $endtry` block (it counts as a single action, with everything it contains).

Plain text between calls is **not** an action and is never skipped.

## How It Works

1. `count` is resolved to an integer (surrounding spaces are ignored; it can come from a function such as `$sum[1;1]`).
2. The next `count` actions of the same block are skipped.
3. Execution resumes with the following action.

Each block has its own numbering: a `$skipActions` inside an `$if` branch or a loop body only affects actions of that branch or body, in that iteration. A `count` larger than the number of remaining actions simply skips them all.

## Errors

`count` must be a non-negative integer. Otherwise: `Expected a non-negative action count.` (`$skipActions[0]` is valid and skips nothing).

## Examples

### Skip the next two calls

```bdfd
$skipActions[2]
$var[a;1]
$var[b;2]
$var[c;3]
[$var[a]|$var[b]|$var[c]]
```

Only `$var[c;3]` runs, so the text ends with `[||3]`.

### Skip a whole condition block

```bdfd
$skipActions[1]
$if[true]
This is not shown.
$endif
This is shown.
```

### Dynamic count

```bdfd
$skipActions[$sum[1;1]]
$var[a;1]
$var[b;1]
$var[c;1]
[$var[a]$var[b]$var[c]]
```

## $skipActions vs $stop

| $skipActions[n] | $stop |
|---|---|
| Skips exactly `n` actions of the current block, then resumes | Ends the script |
| `n` can be dynamic | No argument |

## Notes

- To jump to a given action number instead, see `$jumpToAction`.
- Prefer `$if` blocks for ordinary conditional execution; they are easier to read.
