---
layout: doc
title: $jumpToAction[]
translation_key: docs
category: "Control Flow"
function_name: jumpToAction
syntax: $jumpToAction[targetKey]
description: Redirects execution flow to another action within the current workflow, identified by its target key. Allows non-linear command flow.
---
$jumpToAction enables non-linear execution flow within a workflow. Instead of executing actions sequentially from top to bottom, you can jump to any action identified by a target key, creating loops, branches, and reusable action blocks.

## How It Works

1. Each action in a workflow can be assigned a **target key** (identifier).
2. When `$jumpToAction[targetKey]` is called, execution **transfers** to the action with that key.
3. Actions after the `$jumpToAction` call are **not executed** — execution resumes at the target action.
4. The jump is one-way: there is no automatic return. To return, you must use another `$jumpToAction` call.

## Target Keys

Target keys are defined on actions in the Bot Creator workflow editor. The exact UI for assigning keys depends on the Bot Creator version. Common conventions:

- Use descriptive names: `validationPassed`, `errorHandler`, `mainLoop`.
- Keys are case-sensitive.
- Jumping to a non-existent key will cause a runtime error.

## Common Patterns

### Conditional Branching

```
$if[$condition]
$jumpToAction[branchA]
$endif
$jumpToAction[branchB]
```

### Loops

```
$varSet[i;0]
[loop]
$varSet[i;$math[$var[i]+1]]
$if[$var[i]<10]
$jumpToAction[loop]
$endif
```

### Error Handling / Early Exit

```
$onlyIf[$message!=;Error]
$jumpToAction[processing]
$stop

[processing]
Traitement de : $message
```

## Important Notes

- **No automatic return**: unlike a function call, `$jumpToAction` does not return to the caller. Use `$callWorkflow` if you need call/return semantics.
- **Same workflow only**: jumps are limitd to actions within the same workflow. For cross-workflow jumps, use `$callWorkflow`.
- **Action placement**: target actions must be defined in the workflow. The exact placement (before or after the jump) depends on the Bot Creator workflow editor.

## Comparison with $callWorkflow

| Feature | $jumpToAction | $callWorkflow |
|---------|---------------|---------------|
| Returns to caller | No | Yes (via `$return`) |
| Can pass arguments | No | Yes |
| Cross-workflow | No | Yes |
| Same-workflow | Yes | Yes |
| Use case | Branches, loops | Reusable subroutines |
