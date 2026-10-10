---
layout: doc
title: $input
translation_key: docs
category: "Variables"
function_name: input
syntax: $input[inputID]
description: Returns the value submitted for a modal input, identified by its custom ID.
---

# $input

The function `$input` returns the **value of a modal input** submitted by the user. `inputID` is the custom ID of the field in the modal. It does not return the text typed after a command name.

## Syntax

```
$input[inputID]
```

## Parameters

| Parameter | Description |
|---|---|
| `inputID` | Required. The custom ID of the modal input. |

## Return Value

- **Type**: String
- The value submitted for this input. For a multi-value input, the values are joined with a comma.
- An error is raised if `inputID` is empty ("A modal input ID is required.") or if no value exists for this ID ("Modal input is unavailable").

## Examples

### Echo a modal field

```bdfd
$sendMessage[You wrote: $input[name]]
```

## Notes

- A bare `$input` (without brackets) is invalid: the argument is required.
- Values are only available when the command is triggered by a modal submission.
- To read the arguments of a prefix command, use `$message` (or `$message[n]`).
