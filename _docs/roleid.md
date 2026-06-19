---
layout: doc
title: $roleID
translation_key: docs
category: "Entity Info"
function_name: roleID
syntax: $roleID[name;(guildID)]
description: Returns the ID of a role Discord from son nom or d'une mention. Insensible à la casse.
---

# $roleID

The function `$roleID` retourne l'**ID** of a role Discord from son **nom** or d'une **mention**. The recherche est insensible à la casse.

## Syntax

```
$roleID[name;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name of the role or une mention brute (`<@&id>`). |
| `guildID` | Optional. The ID of the server cible. Si omis, the server courant. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role, or `""` si introuvable. |

## Examples

### Obtenir the ID of a role

```bdfd
$sendMessage[ID of the role Admin : $roleID[Admin]]
```

### Vérifier if a role existe

```bdfd
$if[$roleID[Member]!=]
  $sendMessage[The role Member existe !]
$else
  $sendMessage[Role Member introuvable.]
$endif
```

### À partir d'une mention

```bdfd
$sendMessage[ID extracted de la mention : $roleID[<@&123456789012345678>]]
```

### Dans un autre server

```bdfd
$sendMessage[ID role sur autre server : $roleID[Modo;987654321098765432]]
```

## Notes

- Si several roles portent le même nom, seul le first found est retourné.
- La mention brute (`<@&id>`) est acceptée comme parameter.
- Utilisez `$findRole` for ae recherche par nom partial.
