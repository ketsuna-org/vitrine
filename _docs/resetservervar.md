---
layout: doc
title: $resetServerVar[]
translation_key: docs
category: "Variables"
function_name: resetServerVar
syntax: $resetServerVar[name]
description: "Resets a guild-scoped variable to its declared default value (as defined in the Bot Creator Variables UI) in every guild where it is stored. Alias: $resetGuildVar."
---
$resetServerVar restores a guild-scoped variable to its default value defined in the Bot Creator Variables UI. If no default value is declared for the variable, the function raises an error ("No declared default for ...") instead of removing it. $resetGuildVar is an exact alias and can be used interchangeably.

The function takes exactly one argument, the variable `name` (an empty name raises an error). It resets the variable in every guild where a value is stored, not only the current one; it does not accept a Guild ID.

Use this function to revert server settings to their defaults, clear maintenance mode, or perform bulk resets. After resetting, $getServerVar returns the default value. This function does not return any output.

## Examples

### Reset Server Configuration

```bdfd
$resetServerVar[welcomeMessage]
$title[Reset Server Setting]
$description[Welcome message has been restored to default template.]
$color[#57F287]
```
