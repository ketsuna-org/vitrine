---
layout: doc
title: $colorRole
translation_key: docs
category: "Entity Info"
function_name: colorRole
syntax: $colorRole[userID;(guildID)]
description: Returns the couleur of the role the most élevé of a user, en hexadecimal.
---

# $colorRole

The `$colorRole` function returns the **couleur hexadecimale** of the role the most élevé of a user qui possède une couleur. Très utile pour personnaliser embeds according to the role of the user.

## Syntax

```
$colorRole[userID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user. Required. |
| `guildID` | Optional. The ID of the server cible. |

## Return value

| Type | Description |
|---|---|
| `string` | Hex coloradecimale (ex: `#5865F2`), or `""` si auca role colored. |

## Examples

### Display the color

```bdfd
$sendMessage[Votre couleur of role : $colorRole[$authorID]]
```

### Embed custom

```bdfd
$title[Profil of $username]
$description[
**Role :** $roleName[$getRole[$authorID;1]]
**Couleur :** $colorRole[$authorID]
]
$color[$colorRole[$authorID]]
$sendMessage[]
```

### Couleur of un autre user

```bdfd
$sendMessage[Couleur of <@$mentioned[1]> : $colorRole[$mentioned[1]]]
```

### Fallback si no couleur

```bdfd
$if[$colorRole[$authorID]!=]
  $color[$colorRole[$authorID]]
$else
  $color[#5865F2]
$endif
$title[Profil]
$description[Informations user]
$sendMessage[]
```

## Notes

- Returns a string vide if the user does not have of role with a couleur.
- The color est in the format hexadecimal with `#`.
- Parfait pour `$color[]` in thes embeds.
- À la différence of `$roleColor`, `$colorRole` target a **user**, pas a role.
