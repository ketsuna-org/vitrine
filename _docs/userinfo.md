---
layout: doc
title: $userInfo
translation_key: docs
category: "Entity Info"
function_name: userInfo
syntax: $userInfo[message]
description: Formats the information of the first mentioned user (or of the author) into the description of the embed, using a template with {username}, {ID}, {BOT} and {discriminator}.
---

# $userInfo

The `$userInfo` function **writes a description in the embed** from a template, filled with the information of the **first user mentioned** in the message (the author of the command if the message mentions nobody).

## Syntax

```
$userInfo[message]
```

## Parameters

| Parameter | Description |
|---|---|
| `message` | Required - The template text. The placeholders `{username}`, `{ID}`, `{BOT}` and `{discriminator}` (case-insensitive) are replaced by the username, the ID, `true`/`false` (is a bot) and the discriminator of the user. At most 4096 characters. |

## Return Value

None (empty string). The resulting text is set as the **description of the first embed** (it replaces any earlier `$description`); an error is raised if it exceeds 4096 characters, if the user is not found, or if no message service is configured.

## Examples

### Display user information

```bdfd
$userInfo[**Name:** {username}
**ID:** {ID}
**Bot:** {BOT}]
$color[#5865F2]
$sendMessage[User information]
```

## Notes

- Used on its own (`$userInfo` with no argument), the function is invalid: the template is required.
- The placeholders are the only ones replaced; the function does not return a JSON object and has no `property` argument.
