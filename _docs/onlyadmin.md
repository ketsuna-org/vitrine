---
layout: doc
title: $onlyAdmin
translation_key: docs
category: "Moderation"
function_name: onlyAdmin
syntax: $onlyAdmin
description: Function guard qui stops l'exécution of the command si the user is not administrator of the server.
---

# $onlyAdmin

The function guard `$onlyAdmin` stops immédiatement l'exécution of the command si the user qui l'triggerede ne possède pas la permission **Administrator** on the server.

## Syntax

```
$onlyAdmin
```

## Parameters

Aucun parameter. `$onlyAdmin` s'utilise seul, without argument.

## Behavior

- Si the user est administrator, the command continue normalement.
- Si the user n'est **pas** administrator, the command est immédiatement interrompue (`$stop` implicite).
- Aucun error message n'est sent default — the bot reste silencieux.
- Équivaslow functionnel to `$onlyPerms[Administrator]` mais plus lisible and concis.

## Examples

### Réserver une command to the admins

```bdfd
$onlyAdmin
$ban[$mentioned[1]]
$sendMessage[<@$mentioned[1]> was banni.]
```

### Panneau of administration

```bdfd
$onlyAdmin
$title[⚙️ Panneau Admin]
$description[
**Commands availables :**
`!ban`, `!kick`, `!mute`, `!config`
]
$color[#ED4245]
$sendMessage[]
```

### Command hybride (admin or role modérateur)

```bdfd
$if[$isAdmin==false]
  $onlyForRoles[123456789012345678]
$endif
$sendMessage[Action of modération allowede.]
```

## Notes

- `$onlyAdmin` vérifie only la permission `Administrator`. Pour check of autres permissions, utilisez `$onlyPerms`.
- Le owner of the server est implicitement administrator and passes ce guard.
- Pour ajouter un error message custom, préférez `$onlyPerms[Administrator;Error message]`.
- À placer **en haut** of the command, before toute autre logique.
