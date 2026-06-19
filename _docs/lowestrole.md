---
layout: doc
title: $lowestRole
translation_key: docs
category: "Entity Info"
function_name: lowestRole
syntax: $lowestRole
description: Returns the ID of the role le plus bas (hiérarchiquement) of the user on the server (hors @everyone).
---

# $lowestRole

The variable `$lowestRole` retourne l'**ID of the role le plus bas** in the hiérarchie roles of the user on the server (en excludedant generally `@everyone`).

## Syntax

```
$lowestRole
```

## Return Value

- **Type** : Snowflake (string numérique)
- The ID of the role le plus bas of the user (hors `@everyone`)

## Behavior

- `$lowestRole` ne prend **no argument**.
- Returns the role non-`@everyone` le plus bas in the hiérarchie.
- Si the user n'a qu'a single role (or only `@everyone`), le comportement peut varier.

## Examples

### Listr la hiérarchie complete

```bdfd
$title[Hiérarchie roles]
$description[
**User :** $userName
**Role le plus haut :** $roleName[$highestRole]
**Role le plus bas :** $roleName[$lowestRole]
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier the role le plus bas

```bdfd
$sendMessage[Votre role le plus bas est : $roleName[$lowestRole] (ID: $lowestRole)]
```

## Notes

- `$lowestRole` kicks generally the role `@everyone`.
- La hiérarchie roles est définie in thes parameters of the server.
- Pour obtenir un role with permissions specifics, utilisez `$lowestRoleWithPerms[]`.
