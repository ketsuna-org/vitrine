---
layout: doc
title: $findUser
translation_key: docs
category: "Entity Info"
function_name: findUser
syntax: $findUser[name/mention/ID]
description: Searches for a user by name, mention, or ID and returns their Discord ID. Returns an empty string if no user is found.
---

# $findUser

The `$findUser[]` function allows you to **search for a user** by their name, mention, or ID. It returns the Discord ID of the user found.

## Syntax

```
$findUser[name/mention/ID]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | The search term: username (partial or full), raw mention (`<@ID>`), or numerical ID. |

## Return Value

- **Type**: Snowflake (numeric string) or empty string
- The ID of the corresponding user
- An empty string if no user is found

## Behavior

- The search by name is **case-insensitive**.
- The search by name can be **partial** (e.g., `"Jean"` matches `"JeanDupont"`).
- The search is performed among users known to the bot (shared servers cache).
- Priority of match: exact mention > exact ID > username > server nickname.

## Examples

### Search by command argument

```bdfd
$var[target;$findUser[$message]]
$if[$var[target]!=]
  $title[User Found]
  $description[
  **ID:** $var[target]
  **Name:** $userName[$var[target]]
  ]
  $thumbnail[$userAvatar[$var[target]]]
  $color[#5865F2]
$else
  $sendMessage[No user found for "$message".]
$endif
```

### Search and action

```bdfd
$var[target;$findUser[$message[1]]]
$if[$var[target]!=]
  $if[$checkUserPerms[$authorID;KickMembers]==true]
    $kick[$var[target]]
    $sendMessage[$userName[$var[target]] was kicked.]
  $endif
$else
  $sendMessage[User not found.]
$endif
```

### Search with fallback

```bdfd
$var[target;$findUser[$message]]
$if[$var[target]!=]
  $sendMessage[User: $userName[$var[target]]]
$else
  $sendMessage[User not found. Defaulting to the author.]
  $var[target;$authorID]
$endif
```

## Notes

- `$findUser[]` is more flexible than `$mentioned` because it accepts partial names.
- Always check the result (making sure it is not empty) before using the returned ID.
- Useful for commands where the user can provide a name, an ID, or a mention.
- The search is limited to users that the bot "knows" (present in shared servers).
