---
layout: doc
title: $async
translation_key: docs
category: "Control Flow"
function_name: async
syntax: $async[name]
description: Opens a block, closed by $endAsync, that runs at the same time as the rest of the script. $await[name] waits for it and returns the text it wrote.
---

# $async

`$async[name]` opens a block closed by [`$endAsync`](/docs/endasync/). The body of the block runs **at the same time** as the statements that follow `$endAsync`: both advance in turn each time one of them waits (for a Discord call, an HTTP request, a delay). `$await[name]` waits for the block to finish.

## Syntax

```text
$async[name]
  ...
$endAsync
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required, exactly one argument (otherwise `Invalid argument count for $async: N.`). Evaluated when the block starts, then trimmed. It must be unique in the execution: reusing it raises `Async block "name" already exists.` |

## Behavior

- **Text of the block.** What the body writes is never sent. It is only returned by [`$await[name]`](/docs/await/).
- **Unawaited blocks.** A block nobody awaits is waited for **before the response is sent**: it is never lost and never runs after the interaction has expired. (In BDFD itself the script ends without waiting for it.)
- **Shared state.** Temporary variables, `$setVar` and the services are shared with the rest of the script. The stack of user functions, loops and calls is **private to the block** (copied when it starts): a block started inside a `$for` sees the value of its own iteration.
- **`$stop`, `$break`, `$continue`** only end the block, not the script.
- **Errors.** An error in a block only surfaces at `$await[name]` (where `$try` can catch it) or, if nobody awaited the block, when the script ends. A script that fails stops its running blocks at their next step.
- **Limits.**
  - 25 blocks per execution at most (`Too many async blocks (25 at most).`).
  - `$async` cannot be written inside the argument of another function; it is a top-level structure.
  - Steps of the blocks count in the script's step limit, and the command's time budget (15 minutes) bounds `$await` and the wait for the end of the blocks.
- **Structure errors.** `Missing $endasync.`, `Unexpected $endasync.`.

## Examples

```bdfd
$async[stats]
  $httpGet[https://example.com/stats.json]
  $httpResult
$endAsync
$async[quote]
  $httpGet[https://example.com/quote.txt]
  $httpResult
$endAsync
Stats: $await[stats]
Quote: $await[quote]
```

The two requests run together; the response is written once both are done.
