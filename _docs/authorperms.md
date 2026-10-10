---
layout: doc
title: $authorPerms
translation_key: docs
category: "Moderation"
function_name: authorPerms
syntax: $authorPerms
description: Returns the list of permissions of the command's author as supplied by the execution context (lowercase names separated by commas); empty if the context has none.
---

# $authorPerms

The `$authorPerms` function **returns the permission list that the execution context supplies for the author** of the command. It does not query Discord itself.

## Syntax

```
$authorPerms
```

## Parameters

No parameters are needed. The engine accepts up to two arguments but ignores them, so write `$authorPerms` without brackets.

## Return value

- **Type**: String
- The permission names, in **lowercase** and separated by a **comma without a space**, for example `addreactions,banmembers,sendmessages`.
- An empty string when the context carries no permission data.

## Behavior

- The value is read from the execution context variable `author.permissions`, then `member.permissions` if the first is absent; empty if neither is provided.
- For a server command, the standard member data fills `member.permissions` with the permissions granted by the member's roles (plus the permissions Discord attached to the member of an interaction, when present). A member with the Administrator permission gets every name in the list, and the server owner gets all of them too.
- Because the names are lowercase, test them in lowercase (`banmembers`, not `BanMembers`): `$checkContains[]` is case-sensitive.
- To compute the permissions of a given user, use `$userPerms[userID;amount;separator]`.

## Examples

### Permission verification

```bdfd
$if[$checkContains[$authorPerms;banmembers]==true]
  $sendMessage[✅ You have permission to ban.]
$else
  $sendMessage[❌ Permission "Ban Members" is missing.]
$endif
```

### Debugging permissions

```bdfd
$title[🔑 Your Permissions]
$description[$authorPerms]
```

### Admin-only command

```bdfd
$if[$checkContains[$authorPerms;administrator]==true]
  $c[Sensitive code executed]
  $sendMessage[✅ Admin action performed.]
$elseif[$checkContains[$authorPerms;manageguild]==true]
  $c[Management permissions]
  $sendMessage[✅ Management action performed.]
$else
  $sendMessage[❌ Insufficient permissions.]
$endif
```

### Multi-verification

```bdfd
$if[$checkContains[$authorPerms;kickmembers]==true]
  $if[$checkContains[$authorPerms;banmembers]==true]
    $sendMessage[✅ You can kick AND ban.]
  $else
    $sendMessage[⚠️ You can kick but not ban.]
  $endif
$else
  $sendMessage[❌ No moderation permissions.]
$endif
```

## Notes

- Use `$checkContains[$authorPerms;permission]` with a lowercase name to test a specific permission. A name that is a prefix of another (for example `manage`) also matches, so use the full name.
- To list the permissions of a specific user, use `$userPerms[userID;-1;, ]`.
