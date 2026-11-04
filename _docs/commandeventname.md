---
layout: doc
title: $commandEventName
translation_key: docs
category: "Entity Info"
function_name: commandEventName
syntax: $commandEventName
description: Returns the name of the command (for a deletion, the name it had) that triggered a Command Created, Command Updated or Command Deleted event.
---

# $commandEventName

The `$commandEventName` function **returns the name of the command (for a deletion, the name it had)** that triggered the current event workflow.

## Syntax

```
$commandEventName
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- Example: `salut`.
- Outside a **Command Created**, **Command Updated** or **Command Deleted** event, the error `Invocation metadata commandEvent.name is unavailable.` is raised.

## Behavior

- These events are not Discord events: they fire when a command of the bot is created, edited or deleted in Bot Creator (editor, Studio, Copilot or MCP). Saving a command without changing it fires nothing.
- There is no server, channel or user in these events: pass the channel ID explicitly to `$sendMessage`.

## Examples

```bdfd
$sendMessage[Command updated: $commandEventName ($commandEventID);123456789012345678]
```

## Notes

- Add the workflow in **Workflows → Event → Commands → Command Created / Command Updated / Command Deleted**.
