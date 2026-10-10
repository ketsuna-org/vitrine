---
layout: doc
title: $resetGuildVar[]
translation_key: docs
category: "Variables"
function_name: resetGuildVar
syntax: $resetGuildVar[name]
description: "Resets a guild-scoped variable to its declared default value (as defined in the Bot Creator Variables UI) in every guild where it is stored. Alias: $resetServerVar."
---
$resetGuildVar restores a guild-scoped variable to its default value defined in the Bot Creator Variables UI. If no default value is declared for the variable, the function raises an error ("No declared default for ...") instead of removing it. $resetServerVar is an exact alias and can be used interchangeably.

The function takes exactly one argument, the variable `name` (an empty name raises an error). It resets the variable in every guild where a value is stored, not only the current one; it does not accept a Guild ID.

Use this function to revert server settings to their defaults, clear maintenance mode, or perform bulk resets. After resetting, $getGuildVar returns the default value. This function does not return any output.

## Examples

### Reset Guild Prefix

```bdfd
$resetGuildVar[customPrefix]
$title[Reset Guild Prefix]
$description[The guild prefix has been reset to default.]
$color[#57F287]
```
