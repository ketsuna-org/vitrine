---
layout: doc
title: $roleNames
translation_key: docs
category: "Entity Info"
function_name: roleNames
syntax: $roleNames[(separator);(guildID)]
description: Returns the list of all noms of roles of the server, separateds par un délimitur personnalisable.
---

# $roleNames

The function `$roleNames` retourne la **list complete noms** of all roles of the server, separateds par un délimitur personnalisable.

## Syntax

```
$roleNames[(separator);(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional. The separator between each nom of role. Par default: `, `. |
| `guildID` | Optional. The ID of the server cible. Par default: server courant. |

## Return Value

| Type | Description |
|---|---|
| `string` | Tous les noms of roles concaténés with the separator choisi. |

## Examples

### List simple

```bdfd
$sendMessage[**Roles of the server :** $roleNames]
```

### List with retours to la ligne

```bdfd
$sendMessage[**List roles :**
$roleNames[
]]
```

### Avec separator custom

```bdfd
$sendMessage[Roles : $roleNames[ | ]]
```

### Compter and listr

```bdfd
$sendMessage[The server a $roleCount roles : $roleNames[, ]]
```

## Notes

- The role `@everyone` est generally included in the list.
- Les roles sont listés according to leur ordre hiérarchique (du plus haut to the plus bas).
- Pour les IDs plutôt que les noms, utilisez une autre approche.
