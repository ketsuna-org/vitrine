---
layout: doc
title: $getMemberVar[]
translation_key: docs
category: "Variables"
function_name: getMemberVar
syntax: $getMemberVar[name] or $getMemberVar[name;User ID] or $getMemberVar[name;User ID;Guild ID]
description: "Reads the value of a guild-member-scoped variable. Alias: $getGuildMemberVar. Returns the stored value for the current member, or a specific member when IDs are provided."
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to read.
  - name: User ID
    type: snowflake
    required: false
    description: The Discord user ID whose variable to read in the current guild. If omitted, defaults to the current command author.
  - name: Guild ID
    type: snowflake
    required: false
    description: The Discord guild/server ID. When provided with a User ID, the variable is read from that specific guild+user combination. If only User ID is provided, the current guild is used.
returns:
  type: string
  description: The stored value of the variable for the given guild-member context. Returns the default value (if defined in Bot Creator UI) when no value has been set. Returns an empty string if the variable does not exist and no default is defined.
related:
  - setMemberVar
  - resetMemberVar
  - getUserVar
  - getServerVar
  - getChannelVar
  - getMessageVar
examples:
  - title: Read current member's variable
    code: |
      $description[Your warnings: $getMemberVar[warnings]]
  - title: Read another member's variable in current guild
    code: |
      $description[User 123456 warnings: $getMemberVar[warnings;123456789012345678]]
  - title: Read member variable in a specific guild
    code: |
      $description[User 123456 in guild 789012: $getMemberVar[rank;123456789012345678;789012345678901234]]
  - title: Using the $getGuildMemberVar alias
    code: |
      $description[Your xp: $getGuildMemberVar[xp]]
  - title: Use in conditional logic
    code: |
      $if[$getMemberVar[muted]==true]
      You are currently muted in this server.
      $else
      You can send messages freely.
      $endif
---
$getMemberVar reads a variable scoped to a guild member — a specific user within a specific server. The context key is composed as `guildId:userId`, making the variable value unique per user per server. $getGuildMemberVar is an exact alias and can be used interchangeably.

When called with only a `name`, it reads the variable of the current command author in the current guild (`((guild.id)):((author.id))`). When a User ID is provided, the current guild is still used. When both User ID and Guild ID are provided, the variable is read from the exact guild-member combination.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values. If a variable has not been set via $setMemberVar but a default exists in the definitions, $getMemberVar returns that default. If neither exists, an empty string is returned.
