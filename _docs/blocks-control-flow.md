---
layout: doc
title: Blocks — control flow
category: "Blocks"
api_type: blocks
description: IF / ELSE, Switch, Try / Catch, For Loop, Wait, Stop Execution and Run Workflow, with their output pins, shown with the real blocks of the app.
---

# Control flow Blocks

> 💡 **Resource:** Every field of every block is listed in the **[Complete Blocks Dictionary](/docs/blocks-dictionary/)**, and the execution model is in **[Execution Model & Best Practices](/docs/execution-model/)**.

## IF / ELSE Block

Tests one condition. **Condition.variable** is the left operand, **Condition.operator** the comparison and **Condition.value** the right operand. The block has one output pin per branch: `then`, one `elseif:<i>` pin per **ELSE IF** condition (checked in order) and `else`. The blocks you link to a pin run when that branch is taken. Branches are free: they may rejoin on the same block afterwards, which then runs once, when every active path has arrived.

<div class="block-flow-canvas my-6">
{% app_block example="if_in_server" %}
</div>

Comparisons are `equals`, `notEquals`, `contains`, `notContains`, `startsWith`, `endsWith`, `greaterThan`, `lessThan`, `greaterOrEqual`, `lessOrEqual`, `isEmpty`, `isNotEmpty` and `matches` (regular expression). Numeric comparisons parse operands as numbers.

The engine also understands condition groups (`condition.group` set to `and` or `or`, with `condition.conditions`) and `condition.negate`. The editor does not show these fields; they matter for blocks created through the API or imported from a script.

{% app_block type="ifBlock" %}

## Other flow blocks

### For Loop

Repeats the blocks linked to its `body` pin, then follows `done`. The body is a closed region: no link leaves it and none enters it from outside. In *simple* mode it runs **Iterations** times; in *cstyle* mode it follows an initialiser, a condition and an update. The whole command has a 15 minute execution deadline.

<div class="block-flow-canvas my-6">
{% app_block example="for_three" %}
</div>

{% app_block type="forLoop" %}

### Wait

Pauses the sequence. For a long slash operation, acknowledge the interaction (*Defer Interaction*) before waiting.

<div class="block-flow-canvas my-6">
{% app_block example="wait_two" %}
</div>

### Switch and Try / Catch

{% app_block type="switch" %}

*Switch* replaces the former *Jump to Action* and *Skip Actions* blocks: it compares **Value** (a template resolved at run time) with its `case:<value>` pins and follows the matching one, otherwise `default`. In `int` mode the comparison is numeric. Older commands that used the jump and skip blocks are converted to *Switch* nodes automatically.

{% app_block type="tryCatch" %}

*Try / Catch* runs the blocks linked to `try`; if one fails, `error.*` is filled in and the blocks linked to `catch` run; then `done`. Both are closed regions.

### Stop Execution, Run Workflow

{% app_block type="stop" %}

{% app_block type="runWorkflow" %}

*Run Workflow* needs an existing workflow. Its arguments and results are not persistent ticket storage.

Stop Execution ends the whole graph that is running (a `stop` inside a workflow called by *Run Workflow* only ends that workflow). A graph cannot loop back by itself: use a loop block, and keep every loop bounded.
