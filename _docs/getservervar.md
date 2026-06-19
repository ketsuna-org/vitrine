---
layout: doc
title: $getServerVar[]
translation_key: docs
category: "Variables"
function_name: getServerVar
syntax: $getServerVar[name] or $getServerVar[name;Guild ID]
description: "Reads the value of a guild-scoped variable. Alias: $getGuildVar. Returns the stored value for the current server, or a specific server when a Guild ID is provided."
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to read.
  - name: Guild ID
    type: snowflake
    required: false
    description: The Discord guild/server ID whose variable to read. If omitted, defaults to the current guild (`((guild.id))`).
returns:
  type: string
  description: The stored value of the variable. Returns the default value (if defined in Bot Creator UI) when no value has been set. Returns an empty string if the variable does not exist and no default is defined.
related:
  - setServerVar
  - resetServerVar
  - getUserVar
  - getChannelVar
  - getMemberVar
  - getMessageVar
examples:
  - title: Read current server's variable
    code: |
      $description[Welcome channel: $getServerVar[welcomeChannel]]
  - title: Read another server's variable
    code: |
      $description[Server 456789 prefix: $getServerVar[prefix;456789012345678901]]
  - title: Using the $getGuildVar alias
    code: |
      $description[Log channel: $getGuildVar[logChannel]]
  - title: Conditional based on server setting
    code: |
      $if[$getServerVar[maintenance]==true]
      The bot is under maintenance in this server.
      $else
      All systems operational!
      $endif
---
$getServerVar reads a variable scoped to a Discord guild (server). The variable value is shared by all members within that server context. $getGuildVar is an exact alias and can be used interchangeably.

When called with only a `name`, it reads from the guild where the command is being executed (`((guild.id))`). When a Guild ID is provided as the second argument, the variable is read from the specified guild.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values per variable. If a variable has not been set via $setServerVar but a default exists in the definitions, $getServerVar returns that default. If neither a stored value nor a default exists, an empty string is returned.
