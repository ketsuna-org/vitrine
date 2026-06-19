---
layout: doc
title: $isAdmin
translation_key: docs
category: "Entity Info"
function_name: isAdmin
syntax: $isAdmin
description: Returns "true" si the user possède la permission Administrator on the server, "false" otherwise.
---

# $isAdmin

The variable `$isAdmin` retourne `"true"` si the user possède la permission **Administrator** on the server Discord.

## Syntax

```
$isAdmin
```

## Return Value

- **Type** : String `"true"` or `"false"`
- `"true"` : the user a la permission `Administrator`
- `"false"` : the user n'a pas cette permission

## Behavior

- `$isAdmin` ne prend **no argument**.
- La permission `Administrator` donne **all** les permissions on the server.
- Un owner of server est implicitement administrator (retourne `"true"`).

## Examples

### Restrict une command

```bdfd
$if[$isAdmin==true]
  $ban[$mentioned]
  $sendMessage[<@$mentioned> was banni.]
$else
  $sendMessage[Seuls les administrators can use cette command.]
$endif
```

### Display un menu admin

```bdfd
$if[$isAdmin==true]
  $title[Panneau of administration]
  $description[
  **Commands availables :**
  `/ban`, `/kick`, `/mute`, `/config`
  ]
  $color[#ED4245]
  $sendMessage[]
$endif
```

### Log actions admin

```bdfd
$if[$isAdmin==true]
  $log[Action admin effectuée par $userName (ID: $userID)]
$endif
```

## Notes

- `$isAdmin` vérifie only la permission `Administrator`, pas les autres permissions individuals.
- Pour check une permission specific (ex: `BanMembers`, `ManageMessages`), utilisez `$checkContains[$userPerms;PermissionName]`.
- Équivaslow to `$checkContains[$userPerms;Administrator]==true`.
