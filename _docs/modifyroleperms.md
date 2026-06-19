---
layout: doc
title: $modifyRolePerms
translation_key: docs
category: "Moderation"
function_name: modifyRolePerms
syntax: $modifyRolePerms[roleID;permissions]
description: Modifie les permissions d'un rôle existant.
---

# $modifyRolePerms

La fonction `$modifyRolePerms` **modifie les permissions** d'un rôle existant sur le serveur Discord. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$modifyRolePerms[roleID;permissions]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle à modifier. Obligatoire. |
| `permissions` | Liste des permissions au format `permission=valeur`, séparées par `;`. Obligatoire. |

## Valeur de retour

Aucune. Les permissions du rôle sont mises à jour.

## Exemples

### Désactiver l'envoi de messages

```bdfd
$modifyRolePerms[$roleID[Muet];sendmessages=no;sendmessagesinthreads=no]
$sendMessage[✅ Le rôle Muet ne peut plus envoyer de messages.]
```

### Activer des permissions de modération

```bdfd
$modifyRolePerms[$roleID[Modo];banmembers=yes;kickmembers=yes;managemessages=yes]
$sendMessage[✅ Permissions de modération activées pour le rôle Modo.]
```

### Restreindre un rôle

```bdfd
$modifyRolePerms[$roleID[Restreint];sendmessages=no;connect=no;speak=no]
$sendMessage[✅ Rôle Restreint configuré.]
```

### Commande de gestion des permissions

```bdfd
$if[$isAdmin==true]
  $modifyRolePerms[$roleID[$message[1]];$message[2]]
  $sendMessage[Permissions mises à jour.]
$else
  $sendMessage[Permission refusée.]
$endif
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- Format des permissions : `permission=yes` ou `permission=no`.
- Les permissions sont séparées par des `;`.
- Pour modifier les propriétés du rôle (nom, couleur), utilisez `$modifyRole`.
- Pour voir les permissions actuelles d'un rôle, utilisez `$rolePerms`.
- Les permissions non spécifiées restent inchangées.
