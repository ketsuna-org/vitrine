---
layout: doc
title: $findUser
translation_key: docs
category: "Entity Info"
function_name: findUser
syntax: $findUser[query;(returnAuthor)]
description: Searches the members of the current server for a user by mention, ID or exact username and returns their ID. When nobody is found it returns the ID of the command author, unless the second argument is no.
---

# $findUser

The `$findUser[]` function **searches the members of the current server** for a user given by a mention, an ID or an exact username. It returns the Discord ID of the user found.

## Syntax

```
$findUser[query;(returnAuthor)]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | The search term: a raw mention (`<@ID>` or `<@!ID>`), a numerical ID, or the exact username. Surrounding spaces are removed. |
| `returnAuthor` | Optional. What to do when nobody is found: `yes`/`true`/`on`/`enable` (the default when the argument is absent) returns the ID of the command author; `no`/`false`/`off`/`disable` returns an empty string. Any other value raises `Invalid return-author boolean.` |

## Return Value

- **Type**: Snowflake (numeric string) or empty string
- The ID of the member found.
- When nobody is found: the ID of the command author by default, or an empty string with `returnAuthor` set to `no`. This also applies to an empty `query`.
- If the author is needed but the context has no valid author ID, the error `Invalid user ID.` is raised.

## Behavior

- A mention or a numerical ID is looked up among the members of the current server (the member must be in the server). A mention that matches nobody is not tried as a name.
- Otherwise (not a mention), every member of the server is compared with the query: the match is on the **username**, it is **exact** and **case-sensitive**. There is no partial match and the server nickname is not used.
- A numerical query that is not the ID of a member is also compared as a username.
- Only the first match is returned.
- Looking a name up lists the members of the server through Discord, which can be slow on large servers.

## Examples

### Search by command argument

```bdfd
$var[target;$findUser[$message;no]]
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
$var[target;$findUser[$message[1];no]]
$if[$var[target]!=]
  $if[$checkUserPerms[$authorID;KickMembers]==true]
    $kick[$var[target]]
    $sendMessage[$userName[$var[target]] was kicked.]
  $endif
$else
  $sendMessage[User not found.]
$endif
```

### Default to the author

```bdfd
$var[target;$findUser[$message]]
$sendMessage[User: $userName[$var[target]]]
```

## Notes

- Without the second argument the function never returns an empty string (except when the author cannot be determined, which is an error): pass `no` to detect "not found".
- `$findUser[]` accepts a mention, an ID or a username in one argument, unlike `$mentioned`, which only reads the mentions of the message.
- The search is limited to the members of the current server.
