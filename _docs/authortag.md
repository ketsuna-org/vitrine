---
layout: doc
title: $authorTag
translation_key: docs
category: "Entity Info"
function_name: authorTag
syntax: $authorTag
description: Returns the server tag the author displays next to their name (for example "BCS"), or an empty string when they display none. Bot Creator function, not in BDFD.
---

# $authorTag

The variable `$authorTag` returns the **server tag** of the author of the message: the short tag (up to 4 characters) that Discord shows next to the name of members who have chosen to display a server's tag, for example `BCS` in "Garder500 [BCS]". It is the equivalent of `$userTag[$authorID]`.

This function does not exist in BDFD: it is specific to Bot Creator. To get the username, use `$authorUsername`.

## Syntax

```
$authorTag
```

## Return value

- **Type**: Character string
- The server tag the author displays (`primary_guild.tag`), for example `BCS`.
- An empty string when the author displays no server tag.

## Behavior

- `$authorTag` takes **no arguments** (passing one is an error).
- When the command context does not carry the tag, the author is read from Discord.
- Bots that used `$authorTag` to get a username or `username#discriminator` must use `$authorUsername` (and `$discriminator[$authorID]`) instead.

## Examples

### Author with the server tag

```bdfd
$title[Profile of $authorUsername]
$description[
**Name:** $authorUsername
**Server tag:** $if[$authorTag==]none$else$authorTag$endif
**ID:** $authorID
]
$color[#5865F2]
```

## Notes

- A user can only display the tag of one server at a time, and can turn it off.
- `$userTag` does the same for any user, given their ID.
