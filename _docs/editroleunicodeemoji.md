---
layout: doc
title: $editRoleUnicodeEmoji[]
translation_key: docs
category: "Moderation"
function_name: editRoleUnicodeEmoji
syntax: $editRoleUnicodeEmoji[guildID;roleID;(emoji)]
description: "Edits a role's unicode emoji, returns boolean."
---
# $editRoleUnicodeEmoji — Edits a role's unicode emoji, returns boolean.

## Syntax

```
$editRoleUnicodeEmoji[guildID;roleID;(emoji)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to edit unicode emoji for
- **emoji** *(text, optional)* — The new unicode emoji for the role, omit to clear

## Return Value

- Boolean.

## Usage

```
$editRoleUnicodeEmoji[guildID;roleID;(emoji)] → result
```

## Example

```bdfd
$sendMessage[$editRoleUnicodeEmoji[10;70;⭐]]
```
