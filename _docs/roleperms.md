---
layout: doc
title: $rolePerms
translation_key: docs
category: "Entity Info"
function_name: rolePerms
syntax: $rolePerms[roleID;(guildID)]
description: Retourne les permissions d'un rôle Discord sous forme de liste textuelle ou de valeur brute.
parameters:
  - name: roleID
    description: L'ID du rôle cible.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: string / integer
    description: La liste des permissions ou leur valeur brute.
related:
  - $roleInfo
  - $roleName
  - $rolePosition
examples:
  - description: Permissions d'un rôle
    code: $sendMessage[Perms Admin : $rolePerms[$roleID[Admin]]]
  - description: Vérifier une permission spécifique
    code: |
      $if[$checkContains[$rolePerms[$roleID[Membre]];Administrator]]
        $sendMessage[Ce rôle a la permission Administrateur !]
      $endif
---

# $rolePerms

La fonction `$rolePerms` retourne les **permissions** d'un rôle Discord, soit sous forme de liste textuelle, soit sous forme de valeur entière brute.

## Syntaxe

```
$rolePerms[roleID;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle. Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | La liste des permissions du rôle. |

## Permissions courantes

| Permission | Description |
|---|---|
| `Administrator` | Toutes les permissions |
| `ManageGuild` | Gérer le serveur |
| `ManageRoles` | Gérer les rôles |
| `ManageChannels` | Gérer les salons |
| `KickMembers` | Expulser des membres |
| `BanMembers` | Bannir des membres |
| `ManageMessages` | Gérer les messages |
| `MentionEveryone` | Mentionner @everyone |
| `SendMessages` | Envoyer des messages |
| `ReadMessages` | Voir les salons |
| `Connect` | Se connecter en vocal |

## Exemples

### Afficher les permissions

```bdfd
$sendMessage[Permissions du rôle Admin : $rolePerms[$roleID[Admin]]]
```

### Vérifier une permission

```bdfd
$if[$checkContains[$rolePerms[$roleID[Membre]];Administrator]]
  $sendMessage[⚠️ Le rôle Membre a la permission Administrateur !]
$else
  $sendMessage[Permissions standards.]
$endif
```

### Vérifier si un rôle peut gérer les messages

```bdfd
$if[$checkContains[$rolePerms[$roleID[Modo]];ManageMessages]]
  $sendMessage[Les modérateurs peuvent gérer les messages.]
$endif
```

### Liste formatée

```bdfd
$sendMessage[**Permissions de $roleName[$roleID[Admin]] :**
$rolePerms[$roleID[Admin]]]
```

## Notes

- Le format exact peut varier selon la version de BDFD.
- Pour obtenir la valeur entière brute, utilisez `$roleInfo[ID;permissions]`.
- À utiliser avec `$checkContains` pour tester des permissions spécifiques.
