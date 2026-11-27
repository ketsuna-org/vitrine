---
layout: doc
title: $roleUnicodeEmoji[]
translation_key: docs
category: "Entity Info"
function_name: roleUnicodeEmoji
syntax: $roleUnicodeEmoji[guildID;roleID]
description: "Returns the unicode emoji used by the role."
---
# $roleUnicodeEmoji — Returns the unicode emoji used by the role.

## Syntax

```
$roleUnicodeEmoji[guildID;roleID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to return its unicode emote

## Return Value

- String.

## Usage

```
$roleUnicodeEmoji[guildID;roleID] → result
```

## Example

```bdfd
$sendMessage[$roleUnicodeEmoji[10;70]]
```
