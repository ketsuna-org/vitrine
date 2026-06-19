---
layout: doc
title: $memberPerms
translation_key: docs
category: "Entity Info"
function_name: memberPerms
syntax: $memberPerms
description: Returns the list permissions effectives of the member on the server. Équivaslow to $userPerms.
---

# $memberPerms

The variable `$memberPerms` retourne la **list permissions effectives** of the member on the server current. Elle est équivaslowe to `$userPerms`.

## Syntax

```
$memberPerms
```

## Return Value

- **Type** : List of noms of permissions (en anglais), separateds par virgules
- Example: `SendMessages, ReadMessageHistory, AddReactions, ManageMessages`

## Behavior

- `$memberPerms` ne prend **no argument**.
- Returns thes permissions combinées of all roles of the member and overwrites of channel.
- Functionnellement identical to `$userPerms` for the user déclencheur.

## Examples

### Display les permissions

```bdfd
$title[Permissions of $memberNick]
$description[
**Permissions of the member :**
$memberPerms
]
$color[#5865F2]
$sendMessage[]
```

### Command of modération

```bdfd
$if[$checkContains[$memberPerms;KickMembers]==true]
  $kick[$mentioned]
  $sendMessage[<@$mentioned> was expulsé.]
$else
  $sendMessage[Permission KickMembers requirede.]
$endif
```

## Notes

- `$memberPerms` and `$userPerms` sont interchangeables.
- Les noms of permissions sont en **anglais** (nomenclature API Discord).
- Pour une simple vérification of administration, utilisez `$isAdmin`.
