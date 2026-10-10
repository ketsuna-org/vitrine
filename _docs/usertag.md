---
layout: doc
title: $userTag
translation_key: docs
category: "Entity Info"
function_name: userTag
syntax: $userTag[(userID)]
description: Returns the username of a user (the author by default); for bot accounts, the tag in the form "username#discriminator".
---

# $userTag

The `$userTag` function returns the **tag** of a user: the username for a regular user, and `username#discriminator` for a bot account.

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
- For a **bot** account: `username#discriminator`, with the discriminator left-padded with zeros to 4 digits (e.g. `MyBot#0001`).
- For any other account: the username only, without discriminator.

## Behavior

- The user is fetched from Discord by ID.
- Unlike `$authorTag`, which can read a value supplied by the execution context, `$userTag` always queries the user.

## Examples

### Display the tag

```bdfd
$title[Profile of $userTag]
$description[
**Name:** $userName
**Tag:** $userTag
**ID:** $userID
]
$color[#5865F2]
```

### Tag of a given user

```bdfd
$sendMessage[Tag: $userTag[$authorID]]
```

## Notes

- For a non-bot user, `$userTag` returns the same text as `$userName`.
- To get the discriminator on its own, use `$discriminator[userID]`.
