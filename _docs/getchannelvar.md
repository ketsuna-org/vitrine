---
layout: doc
title: $getChannelVar[]
translation_key: docs
category: "Variables"
function_name: getChannelVar
syntax: $getChannelVar[name] or $getChannelVar[name;Channel ID]
description: Reads the value of a channel-scoped variable. Returns the stored value for the current channel, or a specific channel when a Channel ID is provided.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to read.
  - name: Channel ID
    type: snowflake
    required: false
    description: The Discord channel ID whose variable to read. If omitted, defaults to the current channel (`((channel.id))`).
returns:
  type: string
  description: The stored value of the variable. Returns the default value (if defined in Bot Creator UI) when no value has been set. Returns an empty string if the variable does not exist and no default is defined.
related:
  - setChannelVar
  - resetChannelVar
  - getUserVar
  - getServerVar
  - getMemberVar
  - getMessageVar
examples:
  - title: Read current channel's variable
    code: |
      $description[This channel is: $getChannelVar[channelType]]
  - title: Read another channel's variable
    code: |
      $description[Channel 111222 counter: $getChannelVar[messageCount;111222333444555666]]
  - title: Use in conditional logic
    code: |
      $if[$getChannelVar[locked]==true]
      This channel is currently locked.
      $else
      Channel is open for messages.
      $endif
---
$getChannelVar reads a variable scoped to a Discord channel. The variable value is specific to that channel context within a server. When called with only a `name`, it reads from the channel where the command is being executed (`((channel.id))`). When a Channel ID is provided, the variable is read from the specified channel.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values per variable. If a variable has not been set via $setChannelVar but a default exists in the definitions, $getChannelVar returns that default. If neither a stored value nor a default exists, an empty string is returned.
