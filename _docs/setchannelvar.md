---
layout: doc
title: $setChannelVar[]
translation_key: docs
category: "Variables"
function_name: setChannelVar
syntax: $setChannelVar[name;value] or $setChannelVar[name;value;Channel ID]
description: Stores a value into a channel-scoped variable. Writes to the current channel's variable, or to a specific channel when a Channel ID is provided.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to write.
  - name: value
    type: string
    required: true
    description: The value to store. Can be any string, number, or the result of another function.
  - name: Channel ID
    type: snowflake
    required: false
    description: The Discord channel ID whose variable to set. If omitted, defaults to the current channel (`((channel.id))`).
returns:
  type: void
  description: This function does not return a value.
related:
  - getChannelVar
  - resetChannelVar
  - setUserVar
  - setServerVar
  - setMemberVar
  - setMessageVar
examples:
  - title: Set current channel's variable
    code: |
      $setChannelVar[locked;true]
      $description[This channel is now locked.]
  - title: Set another channel's variable
    code: |
      $setChannelVar[topic;General Discussion;111222333444555666]
      $description[Channel topic saved.]
  - title: Track message count per channel
    code: |
      $setChannelVar[msgCount;$sum[$getChannelVar[msgCount];1]]
  - title: Store channel-specific settings
    code: |
      $setChannelVar[slowmode;5]
      $setChannelVar[nsfwOnly;false]
      $description[Channel settings updated!]
---
$setChannelVar stores a value persistently in the BDFD database under a channel-scoped variable. The variable value is specific to a Discord channel within a server.

When called with two arguments (`name` and `value`), it sets the variable for the current channel (`((channel.id))`). When a Channel ID is provided, the variable is set for the specified channel.

The scope is `channel`, making it ideal for per-channel settings like locks, slowmode, topic tracking, message counters, or channel-specific configurations. This function does not return any output — use $getChannelVar to read the value. To reset, use $resetChannelVar.
