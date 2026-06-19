---
layout: doc
title: $createRole
translation_key: docs
category: "Moderation"
function_name: createRole
syntax: $createRole[name;(color);(hoist);(mentionable)]
description: Creates a new role on the server Discord.
---

# $createRole

The `$createRole` function **crée un new role** on the server Discord and retourne its ID. The bot must have the permission `ManageRoles`.

## Syntax

```
$createRole[name;(color);(hoist);(mentionable)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | The name of the role to create. Required. |
| `color` | Optional. Hex coloradecimale (ex: `"#FF0000"`, `"#3498DB"`). |
| `hoist` | Optional. `"yes"` to display separatedment in the list des members. Default `"no"`. |
| `mentionable` | Optional. `"yes"` pour rendre the role mentionnable. Default `"no"`. |

## Return value

- **Type** : ID of the role created
- The ID can be stored dans a variable for ae usage ultérieure.

## Examples

### Création simple

```bdfd
$createRole[Member VIP]
$sendMessage[✅ Role "Member VIP" created !]
```

### Création avec all options

```bdfd
$var[newRole;$createRole[Staff;#E74C3C;yes;yes]]
$giveRole[$authorID;$var[newRole]]
$sendMessage[Role Staff created and attribué !]
```

### Création avec conditions

```bdfd
$if[$isAdmin==true]
  $var[role;$createRole[$message[1];$message[2];no;no]]
  $sendMessage[Role created with the ID : $var[role]]
$else
  $sendMessage[Permission refusée.]
$endif
```

### Créer a role de couleur

```bdfd
$createRole[Couleur Custome;#9B59B6;no;no]
$sendMessage[Role de couleur created !]
```

## Notes

- The bot must have the permission `ManageRoles`.
- The name of the role is required, les autres parameters are optional.
- The color must be in the format hexadecimal `#RRGGBB`.
- `hoist` : displays thes members of the role dans a section separatede de la list des members.
- `mentionable` : allows mentionner the role avec `@role`.
- Use le return (ID of the role) avec `$giveRole` pour attribuer immediately le new role.
