---
layout: doc
title: $resetServerVar[]
translation_key: docs
category: "Variables"
function_name: resetServerVar
syntax: $resetServerVar[name] or $resetServerVar[name;Guild ID]
description: Resets a guild-scoped variable to its default value (as defined in the Bot Creator Variables UI). Alias: $resetGuildVar.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to reset.
  - name: Guild ID
    type: snowflake
    required: false
    description: The Discord guild/server ID whose variable to reset. If omitted, defaults to the current guild (`((guild.id))`).
returns:
  type: void
  description: This function does not return a value.
related:
  - getServerVar
  - setServerVar
  - resetUserVar
  - resetChannelVar
  - resetMemberVar
examples:
  - title: Reset current server's variable
    code: |
      $resetServerVar[welcomeChannel]
      $description[Welcome channel has been reset to default.]
  - title: Reset another server's variable (using $resetGuildVar)
    code: |
      $resetGuildVar[prefix;987654321098765432]
      $description[Prefix reset for server 987654.]
  - title: Reset multiple server settings
    code: |
      $resetServerVar[maintenance]
      $resetServerVar[autoRole]
      $description[Server settings restored to defaults!]
---
$resetServerVar restores a guild-scoped variable to its default value defined in the Bot Creator Variables UI. If no default is defined, the stored value is removed. $resetGuildVar is an exact alias and can be used interchangeably.

When called with only a `name`, it resets the variable for the current guild. When a Guild ID is provided, it resets the variable for the specified server.

Use this function to revert server settings to their defaults, clear maintenance mode, or perform bulk resets. After resetting, $getServerVar returns the default value (if defined) or an empty string. This function does not return any output.
