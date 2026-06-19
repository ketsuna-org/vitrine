---
layout: doc
title: $workflowResponse
translation_key: docs
category: "Workflows & Automations"
function_name: workflowResponse
syntax: $workflowResponse
description: Returns the last response or value produced by a BDFD workflow. Useful for chaining workflows or retrieving results.
---
# $workflowResponse

The `$workflowResponse` function returns the **last response** produced by a BDFD workflow.

## Syntax

```
$workflowResponse
```

## Parameters

None.

## Return Value

- **Type**: String
- The value returned by the last workflow executed.
- Empty string if no workflow has been called yet.

## Behavior

- Stores the response of the last `$workflow` called.
- The value persists until the end of the command or until the next workflow is called.
- Allows chaining of workflows.

## Examples

### Call and retrieve

```bdfd
$workflow[calculSalaire;$authorID]
$sendMessage[Your calculated salary: $workflowResponse €]
```

### Chain of workflows

```bdfd
$workflow[verifyUser;$authorID]
$if[$workflowResponse==ok]
  $workflow[processOrder;$input]
  $sendMessage[Order processed: $workflowResponse]
$else
  $sendMessage[Verification failed.]
$endif
```

### Log of workflow

```bdfd
$workflow[dailyReward;$authorID]
$log[Daily reward for $username: $workflowResponse]
$sendMessage[$workflowResponse]
```

### Conditional workflow

```bdfd
$workflow[checkBan;$mentioned[1]]
$if[$workflowResponse!="clean"]
  $sendMessage[This user is banned: $workflowResponse]
$else
  $sendMessage[No ban found.]
$endif
```

## Notes

- `$workflowResponse` is overwritten with each new call to `$workflow`.
- Store the value in a temporary variable if you need to reuse it: `$let[rep;$workflowResponse]`.
- The response depends entirely on what the workflow returns via `$sendMessage` or `$return`.
