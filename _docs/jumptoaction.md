---
layout: doc
title: $jumpToAction[]
translation_key: docs
category: "Control Flow"
function_name: jumpToAction
syntax: $jumpToAction[n]
description: Continues the current block at a given action number, skipping the actions in between. It only jumps forward.
---

# $jumpToAction[] — Jump to an Action Number

`$jumpToAction[n]` continues the current block at the action number `n`, skipping the actions in between.

## Syntax

```text
$jumpToAction[n]
```

## What counts as an action

The engine numbers the **function calls** of the current block (the script itself, an `$if` branch, a loop body, ...) starting at 1. `$jumpToAction` is itself an action. A whole `$if ... $endif`, `$for ... $endFor` or `$try ... $endtry` block counts as a single action. Plain text between calls is not an action and is never skipped.

## How It Works

1. `n` is resolved to an integer (surrounding spaces are ignored).
2. The actions of the same block with a number lower than `n` are skipped.
3. Execution continues at the action number `n`.

If `n` is greater than the number of actions of the block, all the remaining actions are skipped.

## Errors

- `n` must be a positive integer, otherwise `Expected a positive action number.`
- `n` must be greater than the number of the `$jumpToAction` call itself: it only jumps forward. Otherwise: `$jumpToAction can only jump to a later action.` It cannot create a loop.

## Example

```bdfd
$jumpToAction[3]
$var[a;1]
$var[b;1]
$var[c;1]
[$var[a]$var[b]$var[c]]
```

`$jumpToAction` is action 1, `$var[a;1]` is action 2, so the jump to 3 skips only `$var[a;1]`: the text ends with `[11]`.

## Notes

- There are no named targets or keys: the target is a number.
- Each block has its own numbering. Inside an `$if` branch or a loop body, the numbers start again at 1 and the jump stays in that block.
- The numbering depends on the structure of the script (each function call is one action); adding a call before the target changes the numbers. For a robust conditional flow, prefer `$if` blocks.
- To skip a number of actions instead of targeting one, see `$skipActions`.
