---
layout: doc
title: $roleName
translation_key: docs
category: "Entity Info"
function_name: roleName
syntax: $roleName[roleID;(guildID)]
description: Returns the nom of a role Discord from son ID.
---

# $roleName

The function `$roleName` retourne le **nom** of a role Discord from son **ID**.

## Syntax

```
$roleName[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the server cible. Si omitted, the server courant. |

## Return Value

| Type | Description |
|---|---|
| `string` | The name of the role (ex: `Admin`, `Modérateur`). |

## Examples

### Obtenir the name of a role

```bdfd
$sendMessage[The role ID 123456789012345678 est : $roleName[123456789012345678]]
```

### Display the name of the first role of a user

```bdfd
$sendMessage[Votre first role : $roleName[$getRole[$authorID;1]]]
```

### Vérifier un nom of role

```bdfd
$if[$roleName[123456789012345678]==Admin]
  $sendMessage[Ceci est bien the role Admin.]
$endif
```

### Dans un autre server

```bdfd
$sendMessage[Role : $roleName[123456789012345678;987654321098765432]]
```

## Notes

- The ID of the role must be valid on the server.
- Pour obtenir the ID from un nom, utilisez `$roleID`.
- Pour listr all roles, utilisez `$roleNames`.
