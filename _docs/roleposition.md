---
layout: doc
title: $rolePosition
translation_key: docs
category: "Entity Info"
function_name: rolePosition
syntax: $rolePosition[roleID;(guildID)]
description: Returns the position hiérarchique of a role in the list roles of the server.
---

# $rolePosition

The function `$rolePosition` retourne la **position hiérarchique** of a role Discord. Plus the position est élevée, plus the role est haut in the hiérarchie of the server.

## Syntax

```
$rolePosition[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the server cible. |

## Return Value

| Type | Description |
|---|---|
| `integer` | The position of the role in the hiérarchie. |

## Examples

### Display the position

```bdfd
$sendMessage[Position of the role Admin : $rolePosition[$roleID[Admin]]]
```

### Comparer two roles

```bdfd
$if[$rolePosition[$roleID[Admin]]>$rolePosition[$roleID[Modo]]]
  $sendMessage[The role Admin est hiérarchiquement supérieur to Modo.]
$else
  $sendMessage[Modo est supérieur or égal to Admin.]
$endif
```

### Vérifier if a role peut en gérer un autre

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]>$rolePosition[$roleID[Cible]]]
  $sendMessage[Votre role est supérieur.]
$else
  $sendMessage[Vous ne pouvez pas agir because votre role est inférieur or égal.]
$endif
```

### Obtenir the role le plus haut

```bdfd
$sendMessage[Role le plus haut of the server : $roleName[$roleID[$roleNames]]]
```

## Notes

- `@everyone` a toudays the position `0`.
- Les positions sont unique : two roles ne can pas avoir la même position.
- Un bot ne peut pas modifier les roles supérieurs to the sien.
