---
layout: doc
title: $await
translation_key: docs
category: "Control Flow"
function_name: await
syntax: $await[name]
description: Waits for the $async block of that name and returns the text it wrote. An error in the block is raised here.
---

# $await

`$await[name]` waits for the end of the block opened by [`$async[name]`](/docs/async/) and returns the **text** that block wrote. That text is never sent otherwise.

## Syntax

```text
$await[name]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required, exactly one argument. Trimmed. The name of an `$async` block already started. |

## Return value

The text written by the block (empty if it wrote nothing).

## Behavior

- A name that matches no started block raises `Unknown async block "name".` The block must have been started (reached by the script) before `$await`.
- If the block failed, its error is raised at `$await`. This is where `$try` can catch it. An error nobody awaited surfaces when the script ends.
- A block cannot wait for itself (`An async block cannot await itself.`) nor in a circle (`Async blocks wait for each other.`).
- The wait is bounded by the time budget of the command (15 minutes) and counts in the step limit of the script.
- Awaiting the same block several times returns the same text.
- Not to be confused with [`$awaitFunc`](/docs/awaitfunc/), which stores a record and never suspends the script.

## Example

```bdfd
$async[a]
  first
$endAsync
$try
  Result: $await[a]
$catch
  The block failed: $error
$endTry
```
