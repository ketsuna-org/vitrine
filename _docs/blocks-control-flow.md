---
layout: doc
title: Blocks — control flow
category: "Blocks"
api_type: blocks
description: ifBlock conditions, nested actions, forLoop, wait, stop and runWorkflow.
---

# Control flow Blocks

> 💡 **Resource:** Find the full list and schema of all 112+ no-code actions in the **[Complete Blocks Dictionary](/docs/blocks-dictionary/)**, as well as the execution model in **[Execution Model & Best Practices](/docs/execution-model/)**.

## ifBlock

`condition.variable` is the left operand string, `condition.operator` the comparison, and `condition.value` the right operand string. `thenActions` and `elseActions` are lists of action objects.

```json
{
  "type":"ifBlock",
  "payload":{
    "condition.variable":"((guild.id))",
    "condition.operator":"isNotEmpty",
    "condition.value":"",
    "thenActions":[{"type":"respondWithMessage","payload":{"content":"This command is running in a server."}}],
    "elseActions":[{"type":"respondWithMessage","payload":{"content":"Use this command in a server."}}]
  }
}
```

Comparisons include `equals`, `notEquals`, `contains`, `notContains`, `startsWith`, `endsWith`, `greaterThan`, `lessThan`, `greaterOrEqual`, `lessOrEqual`, `isEmpty`, `isNotEmpty` and `matches` (regular expression). Numeric comparisons parse operands as numbers. Groups use `condition.group` (`and`/`or`) and `condition.conditions` (list of condition objects); `condition.negate` negates the result.

## Other flow actions

| Action | Payload contract |
|---|---|
| `forLoop` | `mode: "simple"`, `iterations` string, `maxIterations` integer (default 100), `bodyActions` action list. |
| `wait` | `duration` duration string, e.g. `"2s"`. For a long slash operation, acknowledge/defer the interaction before waiting. |
| `stop` | Empty payload; ends the current action sequence. |
| `runWorkflow` | `workflowName` string, optional `entryPoint` string and `arguments` object. The named workflow must exist. |
| `skipActions` | `count` string integer; skips subsequent actions. |
| `jumpToAction` | `targetKey` string identifying an action key. |

```json
{"type":"forLoop","payload":{"mode":"simple","iterations":"3","maxIterations":3,"bodyActions":[{"type":"sendMessage","payload":{"channelId":"123456789012345678","content":"One iteration"}}]}}
```

Keep nested actions as JSON objects, never as BDFD source strings. Loops and jumps need bounded termination. Workflow arguments and results are not persistent ticket storage.
