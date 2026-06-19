---
layout: doc
title: $deleteRole
translation_key: docs
category: "Moderation"
function_name: deleteRole
syntax: $deleteRole[roleID]
description: Supprime un rôle du serveur Discord.
parameters:
  - name: roleID
    description: L'ID du rôle à supprimer. Obligatoire.
returns:
  - type: void
    description: Supprime le rôle. Ne retourne rien.
related:
  - $createRole
  - $modifyRole
  - $roleExists
examples:
  - description: Supprimer un rôle
    code: |
      $deleteRole[$roleID[Ancien Rôle]]
      $sendMessage[Rôle supprimé !]
---

# $deleteRole

La fonction `$deleteRole` **supprime définitivement un rôle** du serveur Discord. Cette action est irréversible. Le bot doit avoir la permission `ManageRoles`.

## Syntaxe

```
$deleteRole[roleID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle à supprimer. Obligatoire. |

## Valeur de retour

Aucune. Le rôle est supprimé du serveur.

## Exemples

### Suppression simple

```bdfd
$deleteRole[$roleID[Ancien Staff]]
$sendMessage[🗑️ Rôle "Ancien Staff" supprimé.]
```

### Suppression avec vérification d'existence

```bdfd
$if[$roleExists[$roleID[VIP]]==true]
  $deleteRole[$roleID[VIP]]
  $sendMessage[Rôle VIP supprimé.]
$else
  $sendMessage[Le rôle VIP n'existe pas.]
$endif
```

### Commande de suppression sécurisée

```bdfd
$if[$isAdmin==true]
  $if[$roleExists[$roleID[$message[1]]]==true]
    $deleteRole[$roleID[$message[1]]]
    $sendMessage[✅ Rôle supprimé avec succès.]
  $else
    $sendMessage[Rôle introuvable.]
  $endif
$else
  $sendMessage[Permission refusée. Admin requis.]
$endif
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- **Action irréversible** : le rôle est définitivement supprimé.
- Le bot ne peut pas supprimer un rôle supérieur au sien.
- Utilisez `$roleExists` pour vérifier l'existence avant suppression.
- Pour modifier un rôle sans le supprimer, utilisez `$modifyRole`.
