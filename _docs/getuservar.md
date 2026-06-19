---
layout: doc
title: $getUserVar[]
translation_key: docs
category: "Variables"
function_name: getUserVar
syntax: $getUserVar[name] or $getUserVar[name;User ID] or $getUserVar[name;User ID;Guild ID]
description: Reads the value of a user-scoped variable. Returns the stored value for the current user, or a specific user when an ID is provided.
parameters:
  - name: name
    type: string
    required: true
    description: The name of the variable to read.
  - name: User ID
    type: snowflake
    required: false
    description: The Discord user ID whose variable to read. If omitted, defaults to the current command author.
  - name: Guild ID
    type: snowflake
    required: false
    description: "The Discord guild/server ID. When provided with a User ID, the variable is read in guild-member scope (scope: guildMember, context: guildId:userId). Otherwise ignored."
returns:
  type: string
  description: The stored value of the variable. Returns the default value (if defined in Bot Creator UI) when no value has been set. Returns an empty string if the variable does not exist and no default is defined.
related:
  - setUserVar
  - resetUserVar
  - getServerVar
  - getChannelVar
  - getMemberVar
  - getMessageVar
examples:
  - title: Read current user's variable
    code: |
      $description[Your balance: $getUserVar[balance]]
  - title: Read another user's variable
    code: |
      $description[User 123456 balance: $getUserVar[balance;123456789012345678]]
  - title: Read a member's variable in a specific guild
    code: |
      $description[Member balance: $getUserVar[balance;123456789012345678;987654321098765432]]
  - title: Use in conditional logic
    code: |
      $if[$getUserVar[premium]==true]
      You have premium access!
      $else
      Premium required.
      $endif
---
$getUserVar reads a scoped variable stored persistently in the BDFD database. The variable is scoped to the user level, meaning its value is tied to a specific Discord user. When called with only a `name`, it reads the variable of the user who triggered the current command (`((author.id))`).

If a second argument (User ID) is provided, the variable is read for that specific user. When a third argument (Guild ID) is also provided, the scope shifts to `guildMember`, using the composite key `guildId:userId` for the context. This is useful when the same user may have different variable values across different servers.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values. If a variable has not been set via $setUserVar but a default value exists in the definitions, $getUserVar returns that default. If neither a stored value nor a default exists, an empty string is returned.
