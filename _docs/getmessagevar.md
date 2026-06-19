---
layout: doc
title: $getMessageVar[]
translation_key: docs
category: "Variables"
function_name: getMessageVar
syntax: $getMessageVar[name] or $getMessageVar[name;Message ID]
description: Reads the value of a message-scoped variable. Returns the stored value for the current message, or a specific message when a Message ID is provided.
---
$getMessageVar reads a variable scoped to a specific Discord message. The variable value is tied directly to a singthe message. When called with only a `name`, it reads from the message that triggered the current command or event. When a Message ID is provided, the variable is read from the specified message.

This is particularly useful for message-tracking features, reaction roles, polls, or any scenario where you need to attach persistent metadata to a specific message.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values. If a variable has not been set via $setMessageVar but a default exists in the definitions, $getMessageVar returns that default. If neither exists, an empty string is returned.
