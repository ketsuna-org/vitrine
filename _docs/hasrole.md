---
layout: doc
title: $hasRole
translation_key: docs
category: "Math & Text"
function_name: hasRole
syntax: $hasRole[userID;roleID]
description: Checks if un user possède un role spécifique on the server.
---

# $hasRole

The function `$hasRole[userID;roleID]` **vérifie if a user possède un role spécifique** on the server. Elle est couramment utilisée for the systèmes de permission.

## Syntax

```
$hasRole[userID;roleID]
```

Ou with a seul parameter (vérifie l'auteur) :

```
$hasRole[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the user. Default: auteur of the command. |
| `roleID` | The ID of the role à vérifier. Required. |

## Return Value

- **Type** : Boolean
- `true` si the user possède the role.
- `false` si the role is not attribué, n'existe pas, or si the user est introuvable.

## Behavior

- Checks in the list des roles of the user on the server courant.
- Functionne only dans un context de server.
- Insensible à la casse du nom de role (si `$roleID[Nom]` is used).

## Examples

### Portail administrator

```bdfd
$if[$hasRole[$authorID;$roleID[Admin]]==true]
  $title[🔧 Panneau Admin]
  $description[
  Commands availables :
  - `!ban <user>` - Bannir un member
  - `!kick <user>` - Expulser un member
  - `!warn <user> <reason>` - Avertir
  ]
  $sendMessage[]
$else
  $sendEphemeral[❌ Accès réservé aux Administrators.]
$endif
```

### Command de staff

```bdfd
$if[$hasRole[$roleID[Staff]]==false]
  $sendMessage[❌ Permission refusée. Role Staff required.]
  $stop
$endif

;; Command executed
$ban[$mentioned[1];Banni par $userName]
$sendMessage[🔨 <@$mentioned[1]> was banni.]
```

### Vérification multi-roles

```bdfd
$if[$hasRole[$mentioned[1];$roleID[Modo]]==true]
  $sendMessage[<@$mentioned[1]> est Modérateur.]
$elseif[$hasRole[$mentioned[1];$roleID[Admin]]==true]
  $sendMessage[<@$mentioned[1]> est Administrator.]
$else
  $sendMessage[<@$mentioned[1]> est un member standard.]
$endif
```

### Badge de role

```bdfd
$if[$hasRole[$roleID[VIP]]==true]
  $var[badge;👑 VIP]
$elseif[$hasRole[$roleID[Booster]]==true]
  $var[badge;🚀 Booster]
$else
  $var[badge;👤 Member]
$endif

$sendMessage[$var[badge] $userName]
```

## Notes

- `$hasRole[userID;roleID]` requiert que the bot thense voir les roles of the server.
- Pour attribuer un role, utilisez `$giveRole[]` or `$giveRoles[]`.
- Pour retirer un role, utilisez `$takeRole[]` or `$takeRoles[]`.
- `$hasRole` est often utilisé comme garde en début de command avec `$stop`.
