---
layout: doc
title: $userName
translation_key: docs
category: "Entity Info"
function_name: userName
syntax: $userName[(userID)]
description: Returns the global Discord username of the user who triggered the command, or of the user whose ID is given.
---

# $userName

The `$userName` function returns the **global Discord username** of the user who triggered the command.

## Syntax

```
$userName[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The numeric ID of the user to look up. Without it, the user who triggered the command is used. A value that is not a valid ID is an error ("Invalid user ID."), and an unknown user is an error ("User not found."). |

## Return Value

- **Type**: String
- The global Discord username (e.g., "JeanDupont")

## Behavior

- Returns the **global** username (the one visible everywhere on Discord, without the discriminator).
- If the user has a nickname on the server, `$userName` still returns their global username. Use `$nickname` for the server nickname, or `$displayName` for the display name.

## Examples

### Welcome message

```bdfd
$title[Welcome $userName!]
$description[We are delighted to welcome you to the server 🎉]
$color[#57F287]
```

### Create a custom embed

```bdfd
$author[$userName;$authorAvatar]
$title[User Profile]
$description[
**Name:** $userName
**ID:** $userID
**Tag:** $userTag
]
$color[#5865F2]
```

## Notes

- The username is set by the user and can be modified at any time.
- Maximum length: 32 characters.
- For reliable identification, use `$userID` rather than `$userName`.
- Do not confuse with `$nickname` (server-specific nickname) and `$displayName` (the best of both).
