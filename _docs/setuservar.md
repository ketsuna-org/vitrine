---
layout: doc
title: $setUserVar[]
translation_key: docs
category: "Variables"
function_name: setUserVar
syntax: $setUserVar[name;value] or $setUserVar[name;value;User ID]
description: Stores a value into a user-scoped variable. Writes to the current user's variable, or to a specific user when a User ID is provided.
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
    description: The Discord user ID whose variable to set. If omitted, defaults to the current command author.
returns:
  type: void
  description: This function does not return a value.
related:
  - getUserVar
  - resetUserVar
  - setServerVar
  - setChannelVar
  - setMemberVar
  - setMessageVar
examples:
  - title: Set current user's variable
    code: |
      $setUserVar[balance;1000]
      $description[Your balance has been set to 1000.]
  - title: Set another user's variable
    code: |
      $setUserVar[wins;5;123456789012345678]
      $description[Updated wins for user 123456.]
  - title: Store result of another function
    code: |
      $setUserVar[lastJoin;$getTimestamp]
      $description[Your last join was recorded.]
  - title: Increment a numeric variable
    code: |
      $setUserVar[score;$sum[$getUserVar[score];10]]
      $description[Score increased by 10! New score: $getUserVar[score]]
  - title: Store complex data as JSON
    code: |
      $setUserVar[profile;{"color":"blue","badges":["vip","early"]}]
      $description[Profile saved!]
---
$setUserVar stores a value persistently in the BDFD database under a user-scoped variable. When called with two arguments (`name` and `value`), it sets the variable for the user who triggered the current command. When a third argument (User ID) is provided, the variable is set for that specific user.

The scope is `user`, meaning the context ID is `((author.id))` by default. This function does not return any output — it performs a silent write operation. Use $getUserVar to read the value back.

Variables must first be defined in the Bot Creator Variables UI. The value stored can be any string, including numbers, booleans, JSON, or the output of other BDFD functions. To reset a variable to its default value, use $resetUserVar.
