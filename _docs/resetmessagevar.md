---
layout: doc
title: $resetMessageVar
translation_key: docs
category: "Variables"
function_name: resetMessageVar
syntax: $resetMessageVar[Name;(Message ID)]
description: Resets a message-scoped variable to its declared default value, for every message or for a single one.
---

# $resetMessageVar

`$resetMessageVar` restores a message-scoped variable to the **default value declared** for it in the Variables catalogue of the bot.

## Syntax

```
$resetMessageVar[Name;(Message ID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Name` | Required. The variable name. An empty name raises "A variable name is required.". |
| `Message ID` | Optional. Resets only the value stored for this message. An invalid ID raises "A valid message ID is required.". Unlike `$getMessageVar`, an empty ID never means the current message. |

## Behavior

- Without `Message ID`, the variable is reset for **all messages** that have a stored value.
- The variable must be declared with a default value; otherwise the error `No declared default for message variable "name".` is raised.
- Returns an empty string.

## Examples

### One message

```bdfd
$resetMessageVar[votes;$messageID]
Votes reset for this message.
```

### Every message

```bdfd
$resetMessageVar[votes]
```
