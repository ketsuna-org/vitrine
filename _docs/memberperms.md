---
layout: doc
title: $memberPerms
translation_key: docs
category: "Entity Info"
function_name: memberPerms
syntax: $memberPerms
description: Returns the list des permissions effectives du member on the server. Équivaslow à $userPerms.
---

# $memberPerms

The variable `$memberPerms` retourne la **list des permissions effectives** du member on the server current. Elle est équivaslowe à `$userPerms`.

## Syntax

```
$memberPerms
```

## Return Value

- **Type** : List de noms de permissions (en anglais), separateds par des virgules
- Example: `SendMessages, ReadMessageHistory, AddReactions, ManageMessages`

## Behavior

- `$memberPerms` ne prend **no argument**.
- Returns thes permissions combinées de all roles du member and des overwrites de channel.
- Functionnellement identical à `$userPerms` for the user déclencheur.

## Examples

### Afficher les permissions

```bdfd
$title[Permissions de $memberNick]
$description[
**Permissions du member :**
$memberPerms
]
$color[#5865F2]
$sendMessage[]
```

### Command de modération

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
- Les noms de permissions sont en **anglais** (nomenclature API Discord).
- Pour une simple vérification d'administration, utilisez `$isAdmin`.
