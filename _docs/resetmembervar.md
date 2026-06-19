---
layout: doc
title: $resetMemberVar[]
translation_key: docs
category: "Variables"
function_name: resetMemberVar
syntax: $resetMemberVar[name] or $resetMemberVar[name;User ID] or $resetMemberVar[name;User ID;Guild ID]
description: "Resets a guild-member-scoped variable to its default value (as defined in the Bot Creator Variables UI). Alias: $resetGuildMemberVar."
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to reset.
  - name: User ID
    type: snowflake
    required: false
    description: The Discord user ID whose member variable to reset in the current guild. If omitted, defaults to the current command author.
  - name: Guild ID
    type: snowflake
    required: false
    description: The Discord guild/server ID. When provided, resets the variable for that specific guild+user combination.
returns:
  type: void
  description: This function does not return a value.
related:
  - getMemberVar
  - setMemberVar
  - resetUserVar
  - resetServerVar
  - resetChannelVar
examples:
  - title: Reset current member's variable
    code: |
      $resetMemberVar[warnings]
      $description[Your warnings have been reset to 0.]
  - title: Reset another member's variable in current guild
    code: |
      $resetMemberVar[xp;123456789012345678]
      $description[XP reset for user 123456.]
  - title: Reset member variable in specific guild (using $resetGuildMemberVar)
    code: |
      $resetGuildMemberVar[rank;123456789012345678;987654321098765432]
      $description[Rank reset for user in that server.]
  - title: Bulk reset after moderation action
    code: |
      $resetMemberVar[warnings;$mentioned[1]]
      $resetMemberVar[muted;$mentioned[1]]
      $description[$username[$mentioned[1]] has been cleared of all warnings.]
---
$resetMemberVar restores a guild-member-scoped variable to its default value defined in the Bot Creator Variables UI. If no default is defined, the stored value is removed. $resetGuildMemberVar is an exact alias.

When called with only a `name`, it resets the variable for the current command author in the current guild. When a User ID is provided, it resets for that user in the current guild. When both User ID and Guild ID are provided, it resets for the exact guild-member combination.

Use this function to clear warnings, reset XP after a season, remove moderation flags, or restore member defaults after an unban/unmute. After resetting, $getMemberVar returns the default value (if defined) or an empty string. This function does not return any output.
