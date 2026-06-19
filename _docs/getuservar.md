---
layout: doc
title: $getUserVar[]
translation_key: docs
category: "Variables"
function_name: getUserVar
syntax: $getUserVar[name] or $getUserVar[name;User ID] or $getUserVar[name;User ID;Guild ID]
description: Reads the value of a user-scoped variable. Returns the stored value for the current user, or a specific user when an ID is provided.
---
$getUserVar reads a scoped variable stored persistently in the BDFD database. The variable is scoped to the user level, meaning its value is tied to a specific Discord user. When called with only a `name`, it reads the variable of the user who triggered the current command (`((author.id))`).

If a second argument (User ID) is provided, the variable is read for that specific user. When a third argument (Guild ID) is also provided, the scope shifts to `guildMember`, using the composite key `guildId:userId` for the context. This is useful when the same user may have different variable values across different servers.

Variables are defined and configured in the Bot Creator Variables UI, where you can set default values. If a variable has not been set via $setUserVar but a default value exists in the definitions, $getUserVar returns that default. If neither a stored value nor a default exists, an empty string is returned.
