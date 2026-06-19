---
layout: doc
title: $resetUserVar[]
translation_key: docs
category: "Variables"
function_name: resetUserVar
syntax: $resetUserVar[name] or $resetUserVar[name;User ID]
description: Resets a user-scoped variable to its default value (as defined in the Bot Creator Variables UI), or removes it if no default exists.
---
$resetUserVar restores a user-scoped variable to its default value, or removes the stored value entirely if no default is defined in the Bot Creator Variables UI. It performs a `resetScopedVariable` action with scope `user`.

When called with only a `name`, it resets the variable for the current command author. When a User ID is provided, it resets the variable for that specific user.

This function is useful for seasonal resets, clearing temporary data, or reverting a user's settings to their defaults. After resetting, subsequent calls to $getUserVar will return the default value (if defined) or an empty string. This function does not return any output.
