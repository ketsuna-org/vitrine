---
layout: doc
title: $highestRole
translation_key: docs
category: "Entity Info"
function_name: highestRole
syntax: $highestRole
description: Returns the ID of the role le plus haut (hiérarchiquement) of the user on the server.
---

# $highestRole

The variable `$highestRole` retourne l'**ID of the role le plus élevé** in the hiérarchie des roles of the user on the server.

## Syntax

```
$highestRole
```

## Return Value

- **Type** : Snowflake (string numérique)
- The ID of the role le plus haut of the user
- Inclut `@everyone` si the user n'a no autre role

## Behavior

- `$highestRole` ne prend **no argument**.
- La hiérarchie est déterminée par the position des roles in thes parameters of the server Discord.
- Si the user a several roles, retourne celui qui est le plus haut in the list.

## Examples

### Afficher the role principal

```bdfd
$title[Profil de $userName]
$author[$userName;$userAvatar]
$description[
**Role le plus haut :** <@&$highestRole>
**Nom of the role :** $roleName[$highestRole]
]
$color[$roleColor[$highestRole]]
$sendMessage[]
```

### Vérifier la hiérarchie

```bdfd
$if[$highestRole==123456789012345678]
  $sendMessage[Vous êtes member du staff !]
$else
  $sendMessage[Role principal : $roleName[$highestRole]]
$endif
```

### Compareason de roles

```bdfd
$let[modRole;123456789012345678]
$if[$rolePosition[$highestRole]>=$rolePosition[$modRole]]
  $sendMessage[Vous avez un role supérieur or égal à Modérateur.]
$endif
```

## Notes

- L'ordre des roles est défini in thes parameters of the server (Drag & Drop in the interface Discord).
- The role `@everyone` est toudays le plus bas, unless des roles sont placés en dessous (réorganisation manuelle).
- Pour the role le plus bas, utilisez `$lowestRole`.
- Utilisez `$roleName[$highestRole]` pour obtenir the name of the role.
