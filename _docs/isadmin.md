---
layout: doc
title: $isAdmin
translation_key: docs
category: "Entity Info"
function_name: isAdmin
syntax: $isAdmin
description: Retourne "true" si l'utilisateur possède la permission Administrateur sur le serveur, "false" sinon.
---

# $isAdmin

La variable `$isAdmin` retourne `"true"` si l'utilisateur possède la permission **Administrateur** sur le serveur Discord.

## Syntaxe

```
$isAdmin
```

## Valeur de retour

- **Type** : Chaîne `"true"` ou `"false"`
- `"true"` : l'utilisateur a la permission `Administrator`
- `"false"` : l'utilisateur n'a pas cette permission

## Comportement

- `$isAdmin` ne prend **aucun argument**.
- La permission `Administrator` donne **toutes** les permissions sur le serveur.
- Un propriétaire de serveur est implicitement administrateur (retourne `"true"`).

## Exemples

### Restreindre une commande

```bdfd
$if[$isAdmin==true]
  $ban[$mentioned]
  $sendMessage[<@$mentioned> a été banni.]
$else
  $sendMessage[Seuls les administrateurs peuvent utiliser cette commande.]
$endif
```

### Afficher un menu admin

```bdfd
$if[$isAdmin==true]
  $title[Panneau d'administration]
  $description[
  **Commandes disponibles :**
  `/ban`, `/kick`, `/mute`, `/config`
  ]
  $color[#ED4245]
  $sendMessage[]
$endif
```

### Log des actions admin

```bdfd
$if[$isAdmin==true]
  $log[Action admin effectuée par $userName (ID: $userID)]
$endif
```

## Notes

- `$isAdmin` vérifie uniquement la permission `Administrator`, pas les autres permissions individuelles.
- Pour vérifier une permission spécifique (ex: `BanMembers`, `ManageMessages`), utilisez `$checkContains[$userPerms;PermissionName]`.
- Équivalent à `$checkContains[$userPerms;Administrator]==true`.
