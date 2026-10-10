---
layout: doc
title: $callWorkflow[]
translation_key: docs
category: "Control Flow"
function_name: callWorkflow
syntax: $callWorkflow[name;arg1;arg2;...]
description: Calls another workflow by name, optionally passing arguments. The called workflow executes, then execution resumes in the caller. The function itself returns an empty string; read the results with $workflowResponse.
---
$callWorkflow enables modular command design by allowing one workflow to invoke another as a subroutine. This promotes code reuse, separation of concerns, and cleaner organization of complex bot logic.

## How It Works

1. `$callWorkflow[name;args...]` is encountered during execution.
2. The specified workflow is located in the same bot.
3. Any arguments are matched against the argument definitions of the called workflow.
4. The called workflow executes from start to finish.
5. The results of the called workflow are stored and can be read afterwards with `$workflowResponse`. `$callWorkflow` itself always returns an empty string.
6. Execution **resumes** in the calling workflow on the next line.

## Argument Passing

Arguments are separated by semicolons after the workflow name. The first argument is the workflow name (required, must not be empty).

```
$callWorkflow[myWorkflow;arg1;arg2;arg3]
```

An argument can be named by writing `name=value` as literal text at the start of the argument; otherwise it is positional and keyed by its position (`1`, `2`, ...):

```
$callWorkflow[myWorkflow;user=$authorID;reason=spam]
```

The values are validated against the argument definitions of the called workflow (missing required arguments are an error).

## Return Values

`$callWorkflow` itself returns an empty string. After the call, the outcome of the called workflow is available through `$workflowResponse`:

- `$workflowResponse` (no argument) returns `WORKFLOW_OK:<entryPoint>` once a call has completed.
- `$workflowResponse[key]` returns one result value of the called workflow (empty string if the key does not exist).
- For a called BDFD script workflow, the keys include `output` (the text produced by the script) and `script`.

```
$callWorkflow[add;5;3]
Result : $workflowResponse[output]
```

## Important Rules

- **Same bot only**: workflows must exist within the same bot. Cross-bot calls are not supported.
- **Workflow must exist**: calling a non-existent workflow raises the error `Workflow not found: <name>.`
- **No recursion**: a workflow (same name and entry point) that is already running cannot be called again; the engine raises `Workflow recursion detected`. Nesting is also limited by the engine's maximum depth.
- **Script workflows**: a called BDFD script workflow must use the `native-v1` backend.

## When to Use

- **Reusable logic**: extract common operations (validation, formatting, calculations) into shared workflows.
- **Command routing**: dispatch to different workflows based on user input or permissions.
- **Separation of concerns**: keep each workflow focused on one task.
- **Testing and maintenance**: smaller, single-purpose workflows are easier to test and debug.

## When Not to Use

- **Simple branching within a single command**: use `$if`/`$else` or `$jumpToAction` instead.
- **One-time logic**: don't extract workflows prematurely. Only create a shared workflow when the logic is reused in 2+ places.

## Comparison with $jumpToAction

| Feature | $callWorkflow | $jumpToAction |
|---------|---------------|---------------|
| Returns to caller | Yes | No |
| Passes arguments | Yes | No |
| Cross-workflow | Yes | No |
| Same-workflow | Yes | Yes |
| Best for | Reusable subroutines | Branches and loops |

## Examples

### Triggering a Background Workflow

```bdfd
$title[Workflow Triggered]
$description[Invoking backend verification workflow for member <@$authorID>...]
$color[#5865F2]
$sendMessage[]
$callWorkflow[verify_user;$authorID]
```
