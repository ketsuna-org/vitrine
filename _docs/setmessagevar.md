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

When called with two arguments (`name` and `value`), it sets the variable for the message that triggered the current command or event. When a Message ID is provided, the variable is set for the specified message.

The scope is `message`, making it ideal for tracking message status, reaction roles, polls, click counters, and any metadata that should be attached to a particular message. This function does not return any output — use $getMessageVar to read the value. There is currently no dedicated resetter for message-scoped variables; use $setMessageVar with an empty value to clear it.
