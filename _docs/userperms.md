---
layout: doc
title: $userPerms
translation_key: docs
category: "Entity Info"
function_name: userPerms
syntax: $userPerms
description: Retourne la liste des permissions effectives de l'utilisateur sur le serveur actuel.
---

# $userPerms

La variable `$userPerms` retourne la **liste des permissions effectives** de l'utilisateur sur le serveur. Les permissions sont calculées en combinant les permissions de tous ses rôles et les overwrites de salon.

## Syntaxe

```
$userPerms
```

## Valeur de retour

- **Type** : Liste de noms de permissions, séparés par des virgules
- Exemple : `SendMessages, ReadMessageHistory, AddReactions, UseExternalEmojis`
- Liste des permissions standard de l'API Discord (https://discord.com/developers/docs/topics/permissions)

## Comportement

- `$userPerms` ne prend **aucun argument**.
- Retourne les **permissions effectives** (résultantes de tous les rôles).
- Si l'utilisateur a la permission `Administrator`, toutes les autres permissions sont implicitement incluses.

## Exemples

### Afficher les permissions

```bdfd
$title[Permissions de $userName]
$description[
**Permissions :**
$userPerms
]
$color[#5865F2]
$sendMessage[]
```

### Restreindre une commande aux modérateurs

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $ban[$mentioned]
  $sendMessage[<@$mentioned> a été banni.]
$else
  $sendMessage[Vous n'avez pas la permission de bannir des membres.]
$endif
```

### Vérifier plusieurs permissions

```bdfd
$if[$checkContains[$userPerms;ManageMessages]==true]
  $deleteMessage[$messageID[$mentioned]]
  $sendMessage[Message supprimé.]
$else
  $sendMessage[Permission ManageMessages requise.]
$endif
```

## Notes

- Les noms de permissions sont en **anglais** (nomenclature API Discord).
- Pour une simple vérification admin, utilisez `$isAdmin` ou `$checkContains[$userPerms;Administrator]`.
- `$userPerms` et `$memberPerms` retournent le même résultat pour l'utilisateur déclencheur.
