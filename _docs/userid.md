---
layout: doc
title: $userID
translation_key: docs
category: "Entity Info"
function_name: userID
syntax: $userID
description: Returns the Discord ID of the user who triggered the command or interaction.
---

# $userID

The `$userID` function returns the **Discord ID** (snowflake) of the user who triggered the execution of the command or interaction.

## Syntax

```
$userID
```

## Return Value

- **Type**: Snowflake (numerical string of 17-19 digits)
- Returns the unique ID of the user on Discord.

## Behavior

- `$userID` takes **no arguments**.
- Always returns the ID of the user who **interacted** with the bot (via command, button, menu, modal, etc.).
- The ID is a permanent numerical string — it never changes, unlike the username.

## Examples

### Display the user ID

```bdfd
$title[Your User ID]
$description[**ID:** `$userID`]
$color[#5865F2]
$sendMessage[]
```

### Use the ID in a condition

```bdfd
$if[$userID==123456789012345678]
  $sendMessage[Hello administrator!]
$else
  $sendMessage[Hello user!]
$endif
```

## Difference with $authorID

- `$userID`: the user who triggered the interaction.
- `$authorID`: the author of the message (in the case of a message command).

In most simple cases, both are identical. In advanced contexts (workflows, interactions), `$userID` is recommended.

## Notes

- The Discord ID is a permanent and unique **snowflake**.
- It is not possible to modify or delete a Discord ID.
- Use `$userID` in comparisons with `$if[]` to create commands reserved for specific users.
