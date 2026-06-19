---
layout: doc
title: $findRole
translation_key: docs
category: "Entity Info"
function_name: findRole
syntax: $findRole[query;(guildID)]
description: Recherche un role par nom partial or complete and retourne son ID. Insensible à la casse.
---

# $findRole

The function `$findRole` recherche un role Discord par **nom partial or complete** and retourne son ID. The recherche est insensible à la casse.

## Syntax

```
$findRole[query;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `query` | The name or partie du nom of the role à rechercher. |
| `guildID` | Optional. The ID of the server cible. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the role found, or `""` si no. |

## Examples

### Recherche par nom partial

```bdfd
$sendMessage[Role correspondant à "mod" : $findRole[mod]]
```

### Attribuer un role found

```bdfd
$if[$findRole[VIP]!=]
  $roleGrant[$authorID;$findRole[VIP]]
  $sendMessage[Role VIP attribué !]
$else
  $sendMessage[Role VIP introuvable.]
$endif
```

### Vérifier l'existence

```bdfd
$if[$findRole[admin]!=]
  $sendMessage[Role found : $roleName[$findRole[admin]]]
$else
  $sendMessage[Aucun role ne correspond à "admin".]
$endif
```

### Fallback avec $roleID

```bdfd
$if[$roleID[Modérateur]!=]
  $sendMessage[ID exact : $roleID[Modérateur]]
$else
  $sendMessage[Recherche étendue : $findRole[mod]]
$endif
```

## Notes

- Si several roles correspondent, le **first** found est retourné.
- Pour une recherche exact, préférez `$roleID`.
- Très pratique when the name exact of the role est incertain.
