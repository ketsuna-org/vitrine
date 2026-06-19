---
layout: doc
title: $userPerms
translation_key: docs
category: "Entity Info"
function_name: userPerms
syntax: $userPerms
description: Returns the list des permissions effectives of the user on the server current.
---

# $userPerms

The variable `$userPerms` retourne la **list des permissions effectives** of the user on the server. The permissions sont calculatedes en combinant les permissions de all their roles and les overwrites de channel.

## Syntax

```
$userPerms
```

## Return Value

- **Type** : List de noms de permissions, separateds par des virgules
- Example: `SendMessages, ReadMessageHistory, AddReactions, UseExternalEmojis`
- List des permissions standard de l'API Discord (https://discord.com/developers/docs/topics/permissions)

## Behavior

- `$userPerms` ne prend **no argument**.
- Returns thes **permissions effectives** (résultantes de all roles).
- Si the user a la permission `Administrator`, all autres permissions sont implicitement includedes.

## Examples

### Afficher les permissions

```bdfd
$title[Permissions de $userName]
$description[
**Permissions :**
$userPerms
]
$color[#5865F2]
$sendMessage[]
```

### Restreindre une command aux modérateurs

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $ban[$mentioned]
  $sendMessage[<@$mentioned> was banni.]
$else
  $sendMessage[Vous n'avez pas la permission de bannir des members.]
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

- Les noms de permissions sont en **anglais** (nomenclature API Discord).
- Pour une simple vérification admin, utilisez `$isAdmin` or `$checkContains[$userPerms;Administrator]`.
- `$userPerms` and `$memberPerms` retournent le même result for the user déclencheur.
