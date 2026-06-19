---
layout: doc
title: $authorPerms
translation_key: docs
category: "Moderation"
function_name: authorPerms
syntax: $authorPerms
description: Returns the list of permissions de the author of the command on the server. Utile pour vérifier dynamicment ce que the user can faire.
---

# $authorPerms

The `$authorPerms` function **récupérer la list of permissions** que possède the author of the command on the server courant.

## Syntax

```
$authorPerms
```

## Parameters

No parameters.

## Return value

- **Type** : String
- List of permissions de the author, separatedes par `, `.
- Example : `SendMessages, ReadMessageHistory, AddReactions, ...`

## Behavior

- Returns thes permissions effectives of the user (tenant compte of roles and of permissions de channel).
- Équivaslow à `$userPerms[$authorID]`.
- Les noms de permissions sont en anglais (format API Discord).

## Examples

### Vérification de permission

```bdfd
$if[$checkContains[$authorPerms;BanMembers]==true]
  $sendMessage[✅ Vous avez the permission de bannir.]
$else
  $sendMessage[❌ Permission "Bannir des members" missinge.]
$endif
```

### Debug of permissions

```bdfd
$title[🔑 Vos permissions]
$description[
$textSplit[$authorPerms;, ]
  $index. $splitText[$index]
$endTextSplit
]
$sendMessage[]
```

### Command admin only

```bdfd
$if[$checkContains[$authorPerms;Administrator]==true]
  // Code sensible executed
  $sendMessage[✅ Action admin effectuée.]
$elseif[$checkContains[$authorPerms;ManageGuild]==true]
  // Permissions de gestion
  $sendMessage[✅ Action de gestion effectuée.]
$else
  $sendMessage[❌ Permissions insuffisantes.]
$endif
```

### Multi-vérification

```bdfd
$if[$checkContains[$authorPerms;KickMembers]==true]
  $if[$checkContains[$authorPerms;BanMembers]==true]
    $sendMessage[✅ Vous pouvez kick ET bannir.]
  $else
    $sendMessage[⚠️ Vous pouvez kick mais pas bannir.]
  $endif
$else
  $sendMessage[❌ Aucune permission de modération.]
$endif
```

## Notes

- Use `$checkContains[$authorPerms;Permission]` to tester une permission spécifique.
- Les permissions sont retournées en anglais (noms API Discord).
- `$authorPerms` est un raccourci pour `$userPerms[$authorID]`.
