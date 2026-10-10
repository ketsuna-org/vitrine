---
layout: doc
title: $callWorkflow[]
translation_key: docs
category: "Control Flow"
function_name: callWorkflow
syntax: $callWorkflow[name;(arg1);(arg2);...]
description: Calls another workflow by name, optionally passing arguments. The called workflow executes, then execution resumes in the caller. The function itself returns an empty string; read the results with $workflowResponse.
---

`$callWorkflow` runs another workflow of the same bot, optionally with arguments, then continues with the calling script.

## Syntax

```text
$callWorkflow[name;(arg1);(arg2);...]
```

It takes 1 to 100 arguments.

## How It Works

1. The `name` (trimmed, required) is looked up among the workflows of the same bot. If it does not exist: `Workflow not found: <name>.`
2. The arguments are matched against the argument definitions of the called workflow (see below). A missing required argument is an error (`Missing required workflow argument "<name>"`).
3. The workflow runs from start to finish. A BDFD script workflow runs in the same execution context (shared variables) and must use the `native-v1` backend (`Called BDFD workflow must select native-v1: <name>.`).
4. Its results are stored and can be read with `$workflowResponse`. `$callWorkflow` itself always returns an empty string.
5. Execution continues in the calling script, unless the called workflow stopped (`$stop`), in which case the calling script stops too.

Before running the called workflow, the response written so far by the caller (text, embeds, components) is sent as its own message. A script that contains `$callWorkflow` is not automatically acknowledged before it runs.

## Argument Passing

Arguments are separated by semicolons after the workflow name.

```text
$callWorkflow[myWorkflow;arg1;arg2;arg3]
```

An argument is **positional** (keyed `1`, `2`, ...) unless it starts with `name=` written as literal text (before any function), in which case it is keyed by that name and the value is what follows the `=`:

```text
$callWorkflow[myWorkflow;user=$authorID;reason=spam]
```

A value that merely contains `=` after a function (for example `$var[x]` returning `a=b`) stays positional. Provided names are matched case-insensitively with the argument definitions of the called workflow; the default value of a definition is used when the argument is not provided or empty. Arguments that are not defined are still passed on.

Inside the called workflow, the arguments are available as the variables `arg.<name>`, `workflow.arg.<name>` and `opts.<name>`.

## Return Values

`$callWorkflow` returns an empty string. After the call:

- `$workflowResponse` (no argument) returns `WORKFLOW_OK:<entryPoint>`.
- `$workflowResponse[key]` returns one result of the called workflow (empty if the key does not exist).
- For a called BDFD script workflow, the keys include `output` (the text produced by the script) and `script` (`BDFD_OK`).

```bdfd
$callWorkflow[add;5;3]
Result: $workflowResponse[output]
```

## Important Rules

- **Same bot only**: the workflow is looked up by name in the current bot.
- **No recursion**: a workflow (same name and entry point) that is already running cannot be called again: `Workflow recursion detected: <name> (<entryPoint>).` Nesting is also limited by the engine's maximum depth (`Workflow nesting limit exceeded.`).

## When Not to Use

- **Simple branching within a single script**: use `$if` / `$else`.
- **One-time logic**: only extract a workflow when the logic is reused.

## Examples

### Calling a workflow with a named argument

```bdfd
$callWorkflow[verify_user;user=$authorID]
Verification finished.
```

### Reading the result

```bdfd
$callWorkflow[calculate_total;price=10;quantity=3]
Total: $workflowResponse[output]
```

## Notes

- The called workflow must exist in the bot: these examples assume workflows named `verify_user` and `calculate_total`.
- This function needs the bot's workflow storage; it could not be run in the offline test engine, so its behavior here comes from reading the code.
