---
layout: doc
title: Blocks — control flow
category: "Blocks"
api_type: blocks
description: IF / ELSE, nested blocks, For Loop, Wait, Stop Execution and Run Workflow, shown with the real blocks of the app.
---

# Control flow Blocks

> 💡 **Resource:** Every field of every block is listed in the **[Complete Blocks Dictionary](/docs/blocks-dictionary/)**, and the execution model is in **[Execution Model & Best Practices](/docs/execution-model/)**.

## IF / ELSE Block

Tests one condition. **Condition.variable** is the left operand, **Condition.operator** the comparison and **Condition.value** the right operand. The **THEN** and **ELSE** tiles open a nested editor holding their own blocks, and **ELSE IF** adds extra conditions checked in order before ELSE.

<div class="block-flow-canvas my-6">
{% app_block example="if_in_server" %}
</div>

Comparisons are `equals`, `notEquals`, `contains`, `notContains`, `startsWith`, `endsWith`, `greaterThan`, `lessThan`, `greaterOrEqual`, `lessOrEqual`, `isEmpty`, `isNotEmpty` and `matches` (regular expression). Numeric comparisons parse operands as numbers.

The engine also understands condition groups (`condition.group` set to `and` or `or`, with `condition.conditions`) and `condition.negate`. The editor does not show these fields; they matter for blocks created through the API or imported from a script.

{% app_block type="ifBlock" %}

## Other flow blocks

### For Loop

Repeats its nested blocks. In *simple* mode it runs **Iterations** times; in *cstyle* mode it follows an initialiser, a condition and an update. The whole command has a 15 minute execution deadline.

<div class="block-flow-canvas my-6">
{% app_block example="for_three" %}
</div>

{% app_block type="forLoop" %}

### Wait

Pauses the sequence. For a long slash operation, acknowledge the interaction (*Defer Interaction*) before waiting.

<div class="block-flow-canvas my-6">
{% app_block example="wait_two" %}
</div>

### Stop Execution, Skip Actions, Jump to Action, Run Workflow

{% app_block type="stop" %}

{% app_block type="skipActions" %}

{% app_block type="jumpToAction" %}

{% app_block type="runWorkflow" %}

*Run Workflow* needs an existing workflow. Its arguments and results are not persistent ticket storage.

Keep nested blocks inside the nested editors of a block, never as BDFD source text. Loops and jumps need a bounded termination.
