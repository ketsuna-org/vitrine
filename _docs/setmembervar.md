---
layout: doc
title: $setMemberVar[]
translation_key: docs
category: "Variables"
function_name: setMemberVar
syntax: $setMemberVar[name;value] or $setMemberVar[name;value;User ID] or $setMemberVar[name;value;User ID;Guild ID]
description: "Stores a value into a guild-member-scoped variable. Alias: $setGuildMemberVar. Writes to the current member's variable, or to a specific member when IDs are provided."
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to write.
  - name: value
    type: string
    required: true
    description: The value to store. Can be any string, number, or the result of another function.
  - name: User ID
    type: snowflake
    required: false
    description: The Discord user ID whose member variable to set in the current guild. If omitted, defaults to the current command author.
  - name: Guild ID
    type: snowflake
    required: false
    description: The Discord guild/server ID. When provided, sets the variable for that specific guild+user combination.
returns:
  type: void
  description: This function does not return a value.
related:
  - getMemberVar
  - resetMemberVar
  - setUserVar
  - setServerVar
  - setChannelVar
  - setMessageVar
examples:
  - title: Set current member's variable
    code: |
      $setMemberVar[xp;500]
      $description[Your XP has been set to 500.]
  - title: Set another member's variable in current guild
    code: |
      $setMemberVar[muted;true;123456789012345678]
      $description[User 123456 has been muted.]
  - title: Set member variable in specific guild (using $setGuildMemberVar)
    code: |
      $setGuildMemberVar[rank;Admin;123456789012345678;987654321098765432]
      $description[Rank updated for user in that server.]
  - title: Increment XP on each message
    code: |
      $setMemberVar[xp;$sum[$getMemberVar[xp];$random[10;25]]]
  - title: Store member metadata
    code: |
      $setMemberVar[warnings;$sum[$getMemberVar[warnings];1]]
      $description[Warning issued. Total: $getMemberVar[warnings]]
---
$setMemberVar stores a value persistently in the BDFD database under a guild-member-scoped variable. The context key is composed as `guildId:userId`, making the value unique per user per server. $setGuildMemberVar is an exact alias.

When called with two arguments, it sets the variable for the current command author in the current guild. When a User ID is provided, it sets for that user in the current guild. When both User ID and Guild ID are provided, it sets for the exact guild-member combination.

The scope is `guildMember`, ideal for per-user-per-server data like XP, warnings, ranks, inventory, economy balances (server-specific), and moderation records. This function does not return any output — use $getMemberVar to read. To reset, use $resetMemberVar.
