---
layout: doc
title: $resetUserVar[]
translation_key: docs
category: "Variables"
function_name: resetUserVar
syntax: $resetUserVar[name] or $resetUserVar[name;User ID]
description: Resets a user-scoped variable to its default value (as defined in the Bot Creator Variables UI), or removes it if no default exists.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to reset.
  - name: User ID
    type: snowflake
    required: false
    description: The Discord user ID whose variable to reset. If omitted, defaults to the current command author.
returns:
  type: void
  description: This function does not return a value.
related:
  - getUserVar
  - setUserVar
  - resetServerVar
  - resetChannelVar
  - resetMemberVar
examples:
  - title: Reset current user's variable
    code: |
      $resetUserVar[balance]
      $description[Your balance has been reset to default.]
  - title: Reset another user's variable
    code: |
      $resetUserVar[wins;123456789012345678]
      $description[Wins reset for user 123456.]
  - title: Reset after a season ends
    code: |
      $resetUserVar[seasonScore]
      $description[Your seasonal score has been reset!]
---
$resetUserVar restores a user-scoped variable to its default value, or removes the stored value entirely if no default is defined in the Bot Creator Variables UI. It performs a `resetScopedVariable` action with scope `user`.

When called with only a `name`, it resets the variable for the current command author. When a User ID is provided, it resets the variable for that specific user.

This function is useful for seasonal resets, clearing temporary data, or reverting a user's settings to their defaults. After resetting, subsequent calls to $getUserVar will return the default value (if defined) or an empty string. This function does not return any output.
