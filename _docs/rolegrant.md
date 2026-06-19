---
layout: doc
title: $roleGrant
translation_key: docs
category: "Moderation"
function_name: roleGrant
syntax: $roleGrant[userID;roleID;(guildID)]
description: Attribue un rôle à un membre du serveur.
parameters:
  - name: userID
    description: L'ID du membre auquel attribuer le rôle.
  - name: roleID
    description: L'ID du rôle à attribuer.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: void
    description: Attribue le rôle. Ne retourne rien.
related:
  - $roleRemove
  - $roleExists
  - $getRole
  - $usersWithRole
examples:
  - description: Donner le rôle Membre
    code: |
      $roleGrant[$authorID;$roleID[Membre]]
      $sendMessage[Rôle Membre attribué !]
  - description: Vérifier avant d'attribuer
    code: |
      $if[$roleExists[$roleID[VIP]]==true]
        $roleGrant[$authorID;$roleID[VIP]]
        $sendMessage[Rôle VIP attribué !]
      $endif
---

# $roleGrant

La fonction `$roleGrant` **attribue un rôle** à un membre du serveur Discord. Le bot doit avoir la permission `ManageRoles` pour effectuer cette action.

## Syntaxe

```
$roleGrant[userID;roleID;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID du membre cible. Obligatoire. |
| `roleID` | L'ID du rôle à attribuer. Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

Aucune. La fonction effectue l'action d'attribution.

## Exemples

### Attribution simple

```bdfd
$roleGrant[$authorID;$roleID[Membre]]
$sendMessage[Vous avez maintenant le rôle Membre !]
```

### Vérification avant attribution

```bdfd
$if[$roleExists[$roleID[VIP]]==true]
  $roleGrant[$authorID;$roleID[VIP]]
  $sendMessage[Rôle VIP attribué avec succès !]
$else
  $sendMessage[Le rôle VIP n'existe pas.]
$endif
```

### Attribution à un autre membre

```bdfd
$roleGrant[$mentioned[1];$roleID[Muet]]
$sendMessage[<@$mentioned[1]> a été rendu muet.]
```

### Avec vérification de hiérarchie

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]>$rolePosition[$roleID[Modo]]]
  $roleGrant[$mentioned[1];$roleID[Modo]]
  $sendMessage[<@$mentioned[1]> est maintenant Modérateur !]
$else
  $sendMessage[Vous n'avez pas la permission de promouvoir des modérateurs.]
$endif
```

## Notes

- Le bot doit avoir la permission `ManageRoles`.
- Le bot ne peut pas attribuer un rôle supérieur à son propre rôle le plus haut.
- Si le membre a déjà le rôle, rien ne se passe.
- Pour retirer un rôle, utilisez `$roleRemove`.
