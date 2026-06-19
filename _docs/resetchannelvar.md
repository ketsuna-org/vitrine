---
layout: doc
title: $resetChannelVar[]
translation_key: docs
category: "Variables"
function_name: resetChannelVar
syntax: $resetChannelVar[name] or $resetChannelVar[name;Channel ID]
description: Resets a channel-scoped variable to its default value (as defined in the Bot Creator Variables UI), or removes it if no default exists.
---
$resetChannelVar restores a channel-scoped variable to its default value defined in the Bot Creator Variables UI. If no default is defined, the stored value is removed entirely.

When called with only a `name`, it resets the variable for the current channel. When a Channel ID is provided, it resets the variable for the specified channel.

Use this function to clear channel-specific settings, reset counters, or restore channel defaults. After resetting, $getChannelVar returns the default value (if defined) or an empty string. This function does not return any output.
