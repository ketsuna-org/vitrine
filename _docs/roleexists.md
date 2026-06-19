---
layout: doc
title: $roleExists
translation_key: docs
category: "Entity Info"
function_name: roleExists
syntax: $roleExists[roleID;(guildID)]
description: Vérifie si un rôle existe sur le serveur. Retourne "true" ou "false".
parameters:
  - name: roleID
    description: L'ID du rôle à vérifier.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: string
    description: '"true" si le rôle existe, "false" sinon.'
related:
  - $roleID
  - $findRole
  - $channelExists
examples:
  - description: Vérifier existence
    code: |
      $if[$roleExists[123456789012345678]==true]
        $sendMessage[Le rôle existe !]
      $else
        $sendMessage[Rôle introuvable.]
      $endif
---

# $roleExists

La fonction `$roleExists` vérifie si un **rôle Discord existe** sur le serveur à partir de son ID.

## Syntaxe

```
$roleExists[roleID;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle à vérifier. Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. Si omis, le serveur courant. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | `"true"` si le rôle existe, `"false"` sinon. |

## Exemples

### Vérification simple

```bdfd
$if[$roleExists[123456789012345678]==true]
  $sendMessage[Le rôle $roleName[123456789012345678] existe.]
$else
  $sendMessage[Ce rôle n'existe pas.]
$endif
```

### Vérifier avant d'attribuer un rôle

```bdfd
$if[$roleExists[$roleID[Membre]]==true]
  $roleGrant[$authorID;$roleID[Membre]]
  $sendMessage[Rôle Membre attribué !]
$else
  $sendMessage[Le rôle Membre n'existe pas. Contactez un administrateur.]
$endif
```

### Dans un autre serveur

```bdfd
$if[$roleExists[123456789012345678;987654321098765432]==true]
  $sendMessage[Rôle valide.]
$endif
```

## Notes

- Retourne une chaîne `"true"` ou `"false"`.
- Utile avant d'utiliser `$roleGrant` ou d'autres fonctions manipulant les rôles.
