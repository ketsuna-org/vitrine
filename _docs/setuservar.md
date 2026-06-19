---
layout: doc
title: $setUserVar[]
translation_key: docs
category: "Variables"
function_name: setUserVar
syntax: $setUserVar[name;value] or $setUserVar[name;value;User ID]
description: Stores a value into a user-scoped variable. Writes to the current user's variable, or to a specific user when a User ID is provided.
---
$setUserVar stores a value persistently in the BDFD database under a user-scoped variable. When called with two arguments (`name` and `value`), it sets the variable for the user who triggered the current command. When a third argument (User ID) is provided, the variable is set for that specific user.

The scope is `user`, meaning the context ID is `((author.id))` by default. This function does not return any output — it performs a silent write operation. Use $getUserVar to read the value back.

Variables must first be defined in the Bot Creator Variables UI. The value stored can be any string, including numbers, booleans, JSON, or the output of other BDFD functions. To reset a variable to its default value, use $resetUserVar.
