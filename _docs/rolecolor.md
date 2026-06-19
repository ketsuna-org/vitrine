---
layout: doc
title: $roleColor
translation_key: docs
category: "Entity Info"
function_name: roleColor
syntax: $roleColor[roleID;(guildID)]
description: Returns the couleur of a role Discord en hexadecimal.
---

# $roleColor

The function `$roleColor` retourne la **couleur** of a role Discord to the format hexadecimal. Si the role n'a pas of couleur définie, elle retourne une string vide.

## Syntax

```
$roleColor[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the server cible. |

## Return Value

| Type | Description |
|---|---|
| `string` | The color en hexadecimal (ex: `#5865F2`), or `""` si pas of couleur. |

## Examples

### Display the color

```bdfd
$sendMessage[Couleur of the role Admin : $roleColor[$roleID[Admin]]]
```

### Embed colored according to the role

```bdfd
$title[Role $roleName[$getRole[$authorID;1]]]
$description[Voici votre role principal.]
$color[$roleColor[$getRole[$authorID;1]]]
$sendMessage[]
```

### Vérifier si the role a une couleur

```bdfd
$if[$roleColor[$roleID[Member]]!=]
  $sendMessage[Couleur : $roleColor[$roleID[Member]]]
$else
  $sendMessage[Ce role n'a pas of couleur.]
$endif
```

### Couleur of the role of a user

```bdfd
$sendMessage[Votre couleur of role : $colorRole[$authorID]]
```

## Notes

- The color est retournée with the préfixe `#`.
- Si the role n'a pas of couleur, the value est une string vide (`""`).
- Pour obtenir the color of the role le plus haut of a user, utilisez `$colorRole`.
