---
layout: doc
title: $setMessageVar[]
translation_key: docs
category: "Variables"
function_name: setMessageVar
syntax: $setMessageVar[name;value] or $setMessageVar[name;value;Message ID]
description: Stores a value into a message-scoped variable. Writes to the current message's variable, or to a specific message when a Message ID is provided.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to write.
  - name: value
    type: string
    required: true
    description: The value to store. Can be any string, number, or the result of another function.
  - name: Message ID
    type: snowflake
    required: false
    description: The Discord message ID whose variable to set. If omitted, defaults to the current triggering message.
returns:
  type: void
  description: This function does not return a value.
related:
  - getMessageVar
  - setUserVar
  - setServerVar
  - setChannelVar
  - setMemberVar
examples:
  - title: Tag the current message
    code: |
      $setMessageVar[approved;true]
      $description[This message has been marked as approved.]
  - title: Set variable on another message
    code: |
      $setMessageVar[trackingData;viewed;333444555666777888]
      $description[Message 333444 marked as viewed.]
  - title: Store metadata on message for reaction roles
    code: |
      $setMessageVar[reactionRole;876543210987654321]
      $description[Reaction role bound to this message!]
  - title: Increment a message-specific counter
    code: |
      $setMessageVar[clicks;$sum[$getMessageVar[clicks];1]]
---
$setMessageVar stores a value persistently in the BDFD database under a message-scoped variable. The variable value is tied directly to a specific Discord message.

When called with two arguments (`name` and `value`), it sets the variable for the message that triggered the current command or event. When a Message ID is provided, the variable is set for the specified message.

The scope is `message`, making it ideal for tracking message status, reaction roles, polls, click counters, and any metadata that should be attached to a particular message. This function does not return any output — use $getMessageVar to read the value. There is currently no dedicated resetter for message-scoped variables; use $setMessageVar with an empty value to clear it.
