---
layout: doc
title: $setMessageVar[]
translation_key: docs
category: "Variables"
function_name: setMessageVar
syntax: $setMessageVar[name;value] or $setMessageVar[name;value;Message ID]
description: Stores a value into a message-scoped variable. Writes to the current message's variable, or to a specific message when a Message ID is provided.
---
$setMessageVar stores a value persistently in the BDFD database under a message-scoped variable. The variable value is tied directly to a specific Discord message.

When called with two arguments (`name` and `value`), it sets the variable for the message that triggered the current command or event. When a Message ID is provided, the variable is set for the specified message; an empty Message ID counts as omitted. If there is no current message ID, the error `Missing context for message variables.` is raised. The function takes 2 or 3 arguments.

The scope is `message`. Writing: the value (any text, stored as a string) is stored for the selected context. The variable does not have to be declared beforehand: if no variable with this name is declared for this scope in the Variables catalogue, the first write declares it, **using the written value as its default value**, so any context that has no stored value then reads that first value instead of an empty string. The name is trimmed, a leading `bc_` is ignored, and an empty name raises an error. Stored values are case-sensitive (`Score` and `score` are two different values). It is ideal for tracking message status, reaction roles, polls, click counters, and any metadata that should be attached to a particular message. This function does not return any output — use $getMessageVar to read the value. There is no dedicated resetter for message-scoped variables. Writing an empty value stores an empty text, but a read of an empty value returns the variable's declared default when it has a non-empty one (including the default created by a first write), so an empty write does not always make `$getMessageVar` return an empty string.

## Examples

### Mark Message as Starred

```bdfd
$setMessageVar[starred;true;$messageID]
$title[Message Starred ⭐]
$description[Message has been added to the starboard!]
$color[#FEE75C]
```
