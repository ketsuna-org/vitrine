---
layout: doc
title: $onlyForGuilds[]
translation_key: docs
category: "Control Flow"
function_name: onlyForGuilds
syntax: $onlyForGuilds[code;guilds...]
description: "Only executes code if given ids match the guild"
---
# $onlyForGuilds — Only executes code if given ids match the guild

## Syntax

```
$onlyForGuilds[code;guilds...]
```

## Parameters

- **code** *(text, required)* — The code to execute if guild is not whitelisted
- **guilds...** *(id, required)* — The guilds to check for

## Return Value

- String.

## Usage

```
$onlyForGuilds[code;guilds...] → result
```

## Example

```bdfd
$sendMessage[$onlyForGuilds[ok;10]]
```
