---
layout: doc
title: $roleExists
translation_key: docs
category: "Entity Info"
function_name: roleExists
syntax: $roleExists[roleID;(guildID)]
description: Checks if un role existe on the server. Returns "true" or "false".
---

# $roleExists

The function `$roleExists` vérifie if a **role Discord existe** on the server from son ID.

## Syntax

```
$roleExists[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to vérifier. Required. |
| `guildID` | Optional. The ID of the server cible. Si omitted, the server courant. |

## Return Value

| Type | Description |
|---|---|
| `string` | `"true"` si the role existe, `"false"` otherwise. |

## Examples

### Vérification simple

```bdfd
$if[$roleExists[123456789012345678]==true]
  $sendMessage[The role $roleName[123456789012345678] existe.]
$else
  $sendMessage[Ce role n'existe pas.]
$endif
```

### Vérifier before of attribuer un role

```bdfd
$if[$roleExists[$roleID[Member]]==true]
  $roleGrant[$authorID;$roleID[Member]]
  $sendMessage[Role Member attribué !]
$else
  $sendMessage[The role Member n'existe pas. Contactez un administrator.]
$endif
```

### Dans un autre server

```bdfd
$if[$roleExists[123456789012345678;987654321098765432]==true]
  $sendMessage[Role valid.]
$endif
```

## Notes

- Returns ae string `"true"` or `"false"`.
- Utile before of use `$roleGrant` or of autres functions manipulant les roles.
