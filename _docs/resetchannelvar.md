---
layout: doc
title: $resetChannelVar[]
translation_key: docs
category: "Variables"
function_name: resetChannelVar
syntax: $resetChannelVar[name] or $resetChannelVar[name;Channel ID]
description: Resets a channel-scoped variable to its default value (as defined in the Bot Creator Variables UI), or removes it if no default exists.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to reset.
  - name: Channel ID
    type: snowflake
    required: false
    description: The Discord channel ID whose variable to reset. If omitted, defaults to the current channel (`((channel.id))`).
returns:
  type: void
  description: This function does not return a value.
related:
  - getChannelVar
  - setChannelVar
  - resetUserVar
  - resetServerVar
  - resetMemberVar
examples:
  - title: Reset current channel's variable
    code: |
      $resetChannelVar[locked]
      $description[Channel lock status has been reset.]
  - title: Reset another channel's variable
    code: |
      $resetChannelVar[topic;111222333444555666]
      $description[Channel topic reset for 111222.]
  - title: Reset channel counter
    code: |
      $resetChannelVar[msgCount]
      $description[Message counter reset for this channel.]
---
$resetChannelVar restores a channel-scoped variable to its default value defined in the Bot Creator Variables UI. If no default is defined, the stored value is removed entirely.

When called with only a `name`, it resets the variable for the current channel. When a Channel ID is provided, it resets the variable for the specified channel.

Use this function to clear channel-specific settings, reset counters, or restore channel defaults. After resetting, $getChannelVar returns the default value (if defined) or an empty string. This function does not return any output.
