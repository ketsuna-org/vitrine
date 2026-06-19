---
layout: doc
title: $getMessageVar[]
translation_key: docs
category: "Variables"
function_name: getMessageVar
syntax: $getMessageVar[name] or $getMessageVar[name;Message ID]
description: Reads the value of a message-scoped variable. Returns the stored value for the current message, or a specific message when a Message ID is provided.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to read.
  - name: Message ID
    type: snowflake
    required: false
    description: The Discord message ID whose variable to read. If omitted, defaults to the current triggering message.
returns:
  type: string
  description: The stored value of the variable. Returns the default value (if defined in Bot Creator UI) when no value has been set. Returns an empty string if the variable does not exist and no default is defined.
related:
  - setMessageVar
  - getUserVar
  - getServerVar
  - getChannelVar
  - getMemberVar
examples:
  - title: Read current message's variable
    code: |
      $description[This message status: $getMessageVar[status]]
  - title: Read another message's variable
    code: |
      $description[Message 333444 data: $getMessageVar[trackingData;333444555666777888]]
  - title: Use in conditional logic
    code: |
      $if[$getMessageVar[approved]==true]
      This message has been approved.
      $else
      This message is pending review.
      $endif
---
$getMessageVar reads a variable scoped to a specific Discord message. The variable value is tied directly to a single message. When called with only a `name`, it reads from the message that triggered the current command or event. When a Message ID is provided, the variable is read from the specified message.

This is particularly useful for message-tracking features, reaction roles, polls, or any scenario where you need to attach persistent metadata to a specific message.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values. If a variable has not been set via $setMessageVar but a default exists in the definitions, $getMessageVar returns that default. If neither exists, an empty string is returned.
