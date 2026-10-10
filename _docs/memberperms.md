---
layout: doc
title: $memberPerms
translation_key: docs
category: "Entity Info"
function_name: memberPerms
syntax: $memberPerms[(unused;unused;unused)]
description: Returns the permissions of the triggering member as supplied by the host in the member.permissions context variable.
---

# $memberPerms

The function `$memberPerms` returns the permissions of the member who triggered the command, exactly as the host supplied them in the `member.permissions` context variable. The engine does not query Discord and does not compute anything itself.

## Syntax

```
$memberPerms[(unused;unused;unused)]
```

## Parameters

Up to three arguments are accepted but all are ignored: the result never depends on them, and the permissions of another member cannot be queried with this function (use `$userPerms[userID;amount;separator]` for that).

## Return Value

- **Type** : String
- The text of the `member.permissions` context variable, or else of `author.permissions`; an empty string if the host supplied neither.
- When the bot runner builds the variable, it is a list of lowercase permission names separated by commas without spaces (for example `addreactions,administrator`), computed from the roles of the member (including `@everyone`), without channel overrides; an administrator or the server owner gets every name.

## Behavior

- The value is returned as supplied; it is not formatted, sorted or translated by `$memberPerms`.
- `$memberPerms` and `$userPerms` are not interchangeable: `$userPerms` requires three arguments (`userID`, `amount`, `separator`) and reads the stored permissions of that user from Discord.

## Examples

### Display permissions

```bdfd
$title[Permissions of $memberNick]
$description[
**Permissions of the member:**
$memberPerms
]
$color[#5865F2]
```

### Moderation command

```bdfd
$if[$checkContains[$memberPerms;kickmembers]==true]
  $kick[$mentioned[1]]
  $sendMessage[<@$mentioned[1]> was kicked.]
$else
  $sendMessage[KickMembers permission required.]
$endif
```

## Notes

- `$checkContains` is case-sensitive, so compare with the lowercase names.
- For a simple check of administrator status, use `$isAdmin[userID]`.

