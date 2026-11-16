---
layout: doc
title: $userTag
translation_key: docs
category: "Entity Info"
function_name: userTag
syntax: $userTag[(userID)]
description: Returns the server tag a user displays next to their name (for example "BCS"), or an empty string when they display none. Bot Creator function, not in BDFD.
---

# $userTag

The `$userTag` function returns the **server tag** of a user: the short tag (up to 4 characters) that Discord shows next to the name of members who have chosen to display a server's tag, for example `BCS` in "Garder500 [BCS]".

This function does not exist in BDFD: it is specific to Bot Creator. To get the username, use `$username`.

## Syntax

```
$userTag[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the user (digits only, greater than 0). Default: the author (`author.id`, else `user.id`). An invalid ID raises `Invalid user ID.`; an unknown user raises `User not found.` |

## Return Value

- **Type**: String
- The server tag the user displays (`primary_guild.tag`), for example `BCS`.
- An empty string when the user displays no server tag.

## Behavior

- For the author, the value supplied by the execution context is used; for another user, the user is fetched from Discord by ID.
- Since this function changed meaning, bots that used `$userTag` to get a username or `username#discriminator` must use `$username[userID]` (and `$discriminator[userID]`) instead.

## Examples

### Display the name with the server tag

```bdfd
$sendMessage[$username[$authorID]$if[$userTag!=] [$userTag]$endif]
```

### Server tag of a given user

```bdfd
$sendMessage[Tag: $userTag[$mentioned[1]]]
```

## Notes

- A user can only display the tag of one server at a time, and can turn it off.
- Use `$authorTag` for the author of the command without an argument.
