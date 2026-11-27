---
layout: doc
title: $applicationCommands[]
translation_key: docs
category: "Interactions"
function_name: applicationCommands
syntax: $applicationCommands[(guildID)]
description: "The application commands of the bot (JSON): global, or of a guild."
---
# $applicationCommands — The application commands of the bot (JSON): global, or of a guild.

## Syntax

```
$applicationCommands[(guildID)]
```

## Parameters

- **guildID** *(String, optional)* — Server ID (empty: global)

## Return Value

- Json.

## Usage

```
$applicationCommands[guildID] → result
```

## Example

```bdfd
$sendMessage[$applicationCommands[guildID]]
```
