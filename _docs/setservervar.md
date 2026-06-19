---
layout: doc
title: $setServerVar[]
translation_key: docs
category: "Variables"
function_name: setServerVar
syntax: $setServerVar[name;value] or $setServerVar[name;value;Guild ID]
description: Stores a value into a guild-scoped variable. Alias: $setGuildVar. Writes to the current server's variable, or to a specific server when a Guild ID is provided.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to write.
  - name: value
    type: string
    required: true
    description: The value to store. Can be any string, number, or the result of another function.
  - name: Guild ID
    type: snowflake
    required: false
    description: The Discord guild/server ID whose variable to set. If omitted, defaults to the current guild (`((guild.id))`).
returns:
  type: void
  description: This function does not return a value.
related:
  - getServerVar
  - resetServerVar
  - setUserVar
  - setChannelVar
  - setMemberVar
  - setMessageVar
examples:
  - title: Set current server's variable
    code: |
      $setServerVar[welcomeChannel;123456789012345678]
      $description[Welcome channel has been set.]
  - title: Set another server's variable (using $setGuildVar)
    code: |
      $setGuildVar[prefix;!;987654321098765432]
      $description[Prefix updated for server 987654.]
  - title: Store server configuration
    code: |
      $setServerVar[autoRole;876543210987654321]
      $setServerVar[logChannel;111111111111111111]
      $description[Server configuration saved!]
  - title: Increment a server counter
    code: |
      $setServerVar[totalCommands;$sum[$getServerVar[totalCommands];1]]
---
$setServerVar stores a value persistently in the BDFD database under a guild-scoped variable. The variable value is shared by all members within that server context. $setGuildVar is an exact alias and can be used interchangeably.

When called with two arguments (`name` and `value`), it sets the variable for the current guild (`((guild.id))`). When a Guild ID is provided, the variable is set for the specified server.

The scope is `guild`, meaning the value is shared server-wide. This is ideal for server settings such as prefixes, welcome channels, auto-roles, logging channels, and similar configuration values. This function does not return any output — use $getServerVar to read the value. To reset, use $resetServerVar.
