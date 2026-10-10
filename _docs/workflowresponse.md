---
layout: doc
title: $workflowResponse
translation_key: docs
category: "Control Flow"
function_name: workflowResponse
syntax: $workflowResponse
description: Returns the status or a named result of the last workflow run with $callWorkflow.
---
# $workflowResponse

The `$workflowResponse` function returns information about the **last workflow run with `$callWorkflow`**.

## Syntax

```
$workflowResponse
$workflowResponse[property]
```

## Parameters

| Parameter | Description |
|---|---|
| `property` | Optional - Name of a result of the last workflow. Without it, the status of the last call is returned. |

## Return Value

- **Type**: String
- Without argument: `WORKFLOW_OK:` followed by the entry point of the workflow that was called (for example `WORKFLOW_OK:main`).
- With `property`: the named result of the last workflow (for a BDFD script workflow, `output` is the text it produced); an empty string if there is none.
- Empty string if no workflow has been called yet.

## Behavior

- The values are set by each `$callWorkflow[name;...]` call and overwritten by the next one.
- A workflow that stops the script also stops the calling script.

## Examples

### Call and retrieve the status

```bdfd
$callWorkflow[dailyReward;user=$authorID]
$sendMessage[Workflow status: $workflowResponse]
```

### Read the output of a script workflow

```bdfd
$callWorkflow[calculSalaire;user=$authorID]
$sendMessage[Your calculated salary: $workflowResponse[output] €]
```

### Chain of workflows

```bdfd
$callWorkflow[verifyUser;user=$authorID]
$if[$workflowResponse[output]==ok]
  $callWorkflow[processOrder;user=$authorID]
  $sendMessage[Order processed: $workflowResponse]
$else
  $sendMessage[Verification failed.]
$endif
```

### Log of workflow

```bdfd
$callWorkflow[dailyReward;user=$authorID]
$log[Daily reward for $username: $workflowResponse[output]]
```

## Notes

- `$workflowResponse` is overwritten with each new call to `$callWorkflow`.
- Store the value in a temporary variable if you need to reuse it: `$var[rep;$workflowResponse[output]]`.
- Arguments are passed to `$callWorkflow` as `name=value`.
