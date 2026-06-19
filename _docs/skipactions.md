---
layout: doc
title: $skipActions
translation_key: docs
category: "Control Flow"
function_name: skipActions
syntax: $skipActions[count]
description: Skips a specified number of subsequent actions in the current execution block.
parameters:
  - name: count
    type: string (resolved to integer)
    required: true
    description: The number of actions to skip. Resolved at runtime from a literal number, variable, or expression. Must evaluate to a non-negative integer.
returns:
  type: void
  description: This function does not return a value — it modifies the execution pointer, causing the next N actions to be bypassed.
related:
  - stop
  - if
  - for
examples:
  - title: Skip next 2 actions
    code: |
      $sendMessage[Line 1]
      $skipActions[2]
      $sendMessage[Line 2 — SKIPPED]
      $sendMessage[Line 3 — SKIPPED]
      $sendMessage[Line 4]
      Result: only "Line 1" and "Line 4" are sent
  - title: Dynamic skip based on variable
    code: |
      $skipActions[$getUserVar[skipCount]]
      $sendMessage[This may or may not be skipped]
      Result: skip count determined by the skipCount variable
  - title: Conditional skip
    code: |
      $if[$getUserVar[admin]==false]
        $skipActions[3]
      $endif
      $sendMessage[Admin action 1]
      $sendMessage[Admin action 2]
      $sendMessage[Admin action 3]
      $sendMessage[Public action]
      Result: non-admin users skip the 3 admin actions and see only "Public action"
  - title: Skip inside a loop
    code: |
      $for[item;A;B;C;D]
        $if[$loopCount==2]
          $skipActions[1]
        $endif
        $sendMessage[$item]
      $endFor
      Result: "A", "C", "D" are sent — "B" is skipped
---
# $skipActions — Skip N Actions

`$skipActions[count]` causes the execution engine to bypass the next `count` actions. Unlike `$stop` which halts everything, `$skipActions` only jumps forward a set number of steps and then resumes normal execution. Think of it as a "fast-forward" button for your action sequence.

## How It Works

When the runtime encounters `$skipActions[count]`:

1. The `count` parameter is resolved (it can be a literal, variable, or expression).
2. The execution pointer advances by `count` positions in the current action list.
3. Any actions between `$skipActions` and the target are completely bypassed.
4. Execution resumes normally after the skipped actions.

Actions are counted within the **current execution block**. Nested blocks (inside `$if`, `$for`, or `$try`) have their own action indexing, and `$skipActions` only affects the immediate enclosing block.

## Count Resolution

The `count` argument is resolved at runtime as a string and then coerced to an integer:

- `$skipActions[3]` — skips 3 actions.
- `$skipActions[$getUserVar[n]]` — skips the number of actions stored in variable `n`.
- `$skipActions[$sum[$getUserVar[a];$getUserVar[b]]]` — skips a computed amount.

If `count` resolves to a non-numeric value or an integer less than 0, behavior is undefined — typically no actions are skipped or an error is raised.

## Use Cases

- **Role-based access control**: Skip admin-only actions for regular users.
- **Feature flags**: Skip experimental feature blocks when a flag is disabled.
- **Error recovery**: Skip a block of actions that depend on a failed prerequisite.
- **Loop control**: Skip processing for certain iterations without breaking the loop.

## $skipActions vs $stop

| $skipActions[n]                                   | $stop                      |
|---------------------------------------------------|----------------------------|
| Skips exactly `n` actions, then resumes           | Halts all execution        |
| Reversible effect (execution continues)           | Permanent halt             |
| Count can be dynamic                              | No arguments               |
| Only affects the current block's action list      | Affects the entire pipeline |

## Interaction with Structural Blocks

- Inside `$if`: `$skipActions` only affects actions within the current branch. It does not skip past `$elseIf`, `$else`, or `$endif`.
- Inside `$for`: Actions skipped count toward the current iteration only. The loop still proceeds to the next iteration.
- Inside `$try`: Skipping in the `$try` body may cause the `$catch` to be skipped if all remaining actions are bypassed and no error was raised.

## Common Pitfalls

- **Skipping past block terminators**: If you `$skipActions` past an `$endif` or `$endFor`, you may get a parse or runtime error. Always ensure your skip count is within the current block's boundaries.
- **Over-skipping**: Skipping more actions than remain in the block causes execution to move to the next sibling block — behavior that may be unexpected.
- **Readability**: Heavy use of `$skipActions` can make action sequences hard to follow. Prefer `$if` blocks for conditional execution when possible.
