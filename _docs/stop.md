---
layout: doc
title: $stop
translation_key: docs
category: "Control Flow"
function_name: stop
syntax: $stop
description: Immediately halts all further action processing in the current execution context.
---
# $stop — Hard Stop Execution

`$stop` is the emergency brake of BDFD scripting. It immediately and unconditionally halts all further action processing. No commands after `$stop` are executed — the action sequence terminates at that exact point.

## Behavior

When `$stop` is encountered:

1. The current action completes up to and including `$stop`.
2. All remaining actions in the current block are **skipped**.
3. If inside a loop (`$for`), the loop exits immediately — no further iterations.
4. If inside an `$if`, the enclosing `$endif` is not reached.
5. If inside a `$try`, execution halts **before** the `$catch` block — `$stop` overrides error handling.

`$stop` is dispatched as a `BotCreatorActionType.stop` action, which tells the BDFD runtime engine to terminate the execution pipeline.

## No Arguments

`$stop` takes no arguments. The syntax is simply:

```
$stop
```

Any arguments provided are ignored.

## Use Cases

- **Early exit on invalid state**: Stop immediately if required data is missing or corrupted.
- **Content moderation**: Halt execution when forbidden content is detected.
- **Guard clauses**: Check preconditions at the start of an action and stop if they fail.
- **Loop breaking**: Exit a `$for` loop prematurely based on a condition.
- **Rate limiting**: Stop processing if a user has exceeded their quota.

## $stop vs $skipActions

| Feature         | $stop                          | $skipActions[n]              |
|-----------------|---------------------------------|------------------------------|
| Scope           | Halts **all** remaining actions | Skips only `n` next actions  |
| Resumable       | No                              | Yes, after skipping `n`      |
| In loops        | Exits the loop completely       | Skips actions within the loop |

Use `$stop` for terminal halts; use `$skipActions` for non-terminal jumps.

## Interaction with $try / $catch

If `$stop` is called inside a `$try` block, the `$catch` block is **not** executed. `$stop` bypasses error handling entirely. This is intentional — if you want to catch errors and then stop, call `$stop` inside the `$catch` block instead.

## Common Pitfalls

- Placing important cleanup or logging code after `$stop` — it will never execute.
- Using `$stop` inside a `$try` and expecting the `$catch` to still run.
- Confusing `$stop` with `$skipActions[1]` — `$stop` kills the entire action sequence, not just the next command.
