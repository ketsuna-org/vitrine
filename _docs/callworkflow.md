---
layout: doc
title: $callWorkflow[]
translation_key: docs
category: "Control Flow"
function_name: callWorkflow
syntax: $callWorkflow[name;arg1;arg2;...]
description: Calls another workflow by name, optionally passing arguments. The called workflow executes and can return a value. Execution resumes in the caller after the called workflow completes.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the workflow to call. The workflow must exist in the same bot. Case-sensitive.
  - name: argN
    type: string
    required: false
    description: Optional arguments passed to the called workflow. The called workflow can access these via its own argument functions (e.g., $args[0], $args[1], etc.).
returns:
  type: string
  description: Returns the value produced by the called workflow (via $return). If the workflow does not use $return, returns an empty string.
related:
  - jumpToAction
  - awaitFunc
  - eval
  - args
examples:
  - title: Appel simple sans arguments
    code: |
      $callWorkflow[calculateScore]
      Score calculé : $result
  - title: Appel avec arguments
    code: |
      $callWorkflow[formatName;John;Doe]
      Nom formaté : $result
  - title: Workflow appelé (formatName)
    code: |
      $args[0] $args[1]!
      Résultat : John Doe!
  - title: Appel conditionnel d'un workflow
    code: |
      $if[$hasPerms[$authorID;Administrator]==true]
      $callWorkflow[adminDashboard]
      $else
      $callWorkflow[userDashboard]
      $endif
  - title: Chaînage de workflows
    code: |
      $callWorkflow[validateInput;$message]
      $if[$result==valid]
      $callWorkflow[processData;$message]
      $endif
---
$callWorkflow enables modular command design by allowing one workflow to invoke another as a subroutine. This promotes code reuse, separation of concerns, and cleaner organization of complex bot logic.

## How It Works

1. `$callWorkflow[name;args...]` is encountered during execution.
2. The specified workflow is located in the same bot.
3. Any arguments are passed to the called workflow (accessible via `$args`, `$argCount`, etc.).
4. The called workflow executes from start to finish.
5. If the called workflow uses `$return[value]`, that value becomes the return value of `$callWorkflow`.
6. Execution **resumes** in the calling workflow on the next line.

## Argument Passing

Arguments are passed positionally, separated by semicolons:

```
$callWorkflow[myWorkflow;arg1;arg2;arg3]
```

In the called workflow, arguments are accessed exactly like command arguments:
- `$args[0]` → `arg1`
- `$args[1]` → `arg2`
- `$argCount` → `3`

## Return Values

The called workflow can return a value using `$return`:

```
$return[resultValue]
```

In the calling workflow, the return value is captured by `$callWorkflow` and can be used directly:

```
$callWorkflow[add;5;3]
Résultat : $callWorkflow[add;5;3]
```

Or stored in a variable:

```
$varSet[total;$callWorkflow[add;5;3]]
Total : $var[total]
```

## Important Rules

- **Same bot only**: workflows must exist within the same bot. Cross-bot calls are not supported.
- **Workflow must exist**: calling a non-existent workflow causes a runtime error.
- **Case-sensitive names**: `myWorkflow` and `myworkflow` are different workflows.
- **No recursion limit** (implementation-dependent): some versions may impose recursion depth limits. Avoid infinite recursion.
- **Variable scope**: variables set in the called workflow are **local** to that workflow and do not leak into the caller, unless using global variable functions like `$setVar`.

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
