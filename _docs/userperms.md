---
layout: doc
title: $userPerms
translation_key: docs
category: "Entity Info"
function_name: userPerms
syntax: $userPerms
description: Returns the list permissions effectives of the user on the server current.
---

# $userPerms

The variable `$userPerms` retourne la **list permissions effectives** of the user on the server. The permissions sont calculatedes en combinant les permissions of all their roles and les overwrites of channel.

## Syntax

```
$userPerms
```

## Return Value

- **Type** : List of noms of permissions, separateds par virgules
- Example: `SendMessages, ReadMessageHistory, AddReactions, UseExternalEmojis`
- List permissions standard of l'API Discord (https://discord.com/developers/docs/topics/permissions)

## Behavior

- `$userPerms` ne prend **no argument**.
- Returns thes **permissions effectives** (résultantes of all roles).
- Si the user a la permission `Administrator`, all autres permissions sont implicitement includedes.

## Examples

### Display les permissions

```bdfd
$title[Permissions of $userName]
$description[
**Permissions :**
$userPerms
]
$color[#5865F2]
$sendMessage[]
```

### Restrict une command to the modérateurs

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $ban[$mentioned]
  $sendMessage[<@$mentioned> was banni.]
$else
  $sendMessage[Vous n'avez pas la permission of bannir members.]
$endif
```

### Vérifier several permissions

```bdfd
$if[$checkContains[$userPerms;ManageMessages]==true]
  $deleteMessage[$messageID[$mentioned]]
  $sendMessage[Message deleted.]
$else
  $sendMessage[Permission ManageMessages requirede.]
$endif
```

## Notes

- Les noms of permissions sont en **anglais** (nomenclature API Discord).
- Pour une simple vérification admin, utilisez `$isAdmin` or `$checkContains[$userPerms;Administrator]`.
- `$userPerms` and `$memberPerms` retournent le même result for the user déclencheur.
