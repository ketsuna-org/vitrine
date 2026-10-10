---
layout: doc
title: $resetChannelVar[]
translation_key: docs
category: "Variables"
function_name: resetChannelVar
syntax: $resetChannelVar[name]
description: Resets a channel-scoped variable to its declared default value (as defined in the Bot Creator Variables UI) in every channel where it is stored.
---
$resetChannelVar restores a channel-scoped variable to its default value defined in the Bot Creator Variables UI. If no default value is declared for the variable, the function raises an error ("No declared default for ...") instead of removing it.

The function takes exactly one argument, the variable `name` (an empty name raises an error). It resets the variable in every channel where a value is stored, not only the current one; it does not accept a Channel ID.

Use this function to clear channel-specific settings, reset counters, or restore channel defaults. After resetting, $getChannelVar returns the default value. This function does not return any output.

## Examples

### Reset Channel Variable

```bdfd
$resetChannelVar[topicLock]
$title[Reset Variable]
$description[Reset `topicLock` variable to its default value.]
$color[#57F287]
```
