---
layout: doc
title: $commandEventID
translation_key: docs
category: "Entity Info"
function_name: commandEventID
syntax: $commandEventID
description: Returns the ID of the command that triggered a Command Created, Command Updated or Command Deleted event.
---

# $commandEventID

The `$commandEventID` function **returns the ID of the command** that triggered the current event workflow.

## Syntax

```
$commandEventID
```

## Parameters

None (passing one is an error).

## Return value

- **Type**: String
- Example: `1234567890`.
- Outside a **Command Created**, **Command Updated** or **Command Deleted** event, the error `Invocation metadata commandEvent.id is unavailable.` is raised.

## Behavior

- These events are not Discord events: they fire when a command of the bot is created, edited or deleted in Bot Creator (editor, Studio, Copilot or MCP). Saving a command without changing it fires nothing.
- There is no server, channel or user in these events: pass the channel ID explicitly to `$sendMessage`.

## Examples

```bdfd
$channelSendMessage[123456789012345678;Command updated: $commandEventName ($commandEventID)]
```

## Notes

- Add the workflow in **Workflows → Event → Commands → Command Created / Command Updated / Command Deleted**.
