---
layout: doc
title: $roleName
translation_key: docs
category: "Entity Info"
function_name: roleName
syntax: $roleName[roleID;(guildID)]
description: Retourne le nom d'un rôle Discord à partir de son ID.
parameters:
  - name: roleID
    description: L'ID du rôle cible.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: string
    description: Le nom du rôle.
related:
  - $roleID
  - $roleNames
  - $roleColor
  - $findRole
examples:
  - description: Nom d'un rôle
    code: "$sendMessage[Rôle : $roleName[123456789012345678]]"
  - description: Nom du rôle à partir de $getRole
    code: "$sendMessage[Votre rôle : $roleName[$getRole[$authorID;1]]]"
---

# $roleName

La fonction `$roleName` retourne le **nom** d'un rôle Discord à partir de son **ID**.

## Syntaxe

```
$roleName[roleID;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle. Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. Si omis, le serveur courant. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Le nom du rôle (ex: `Admin`, `Modérateur`). |

## Exemples

### Obtenir le nom d'un rôle

```bdfd
$sendMessage[Le rôle ID 123456789012345678 est : $roleName[123456789012345678]]
```

### Afficher le nom du premier rôle d'un utilisateur

```bdfd
$sendMessage[Votre premier rôle : $roleName[$getRole[$authorID;1]]]
```

### Vérifier un nom de rôle

```bdfd
$if[$roleName[123456789012345678]==Admin]
  $sendMessage[Ceci est bien le rôle Admin.]
$endif
```

### Dans un autre serveur

```bdfd
$sendMessage[Rôle : $roleName[123456789012345678;987654321098765432]]
```

## Notes

- L'ID du rôle doit être valide sur le serveur.
- Pour obtenir l'ID à partir d'un nom, utilisez `$roleID`.
- Pour lister tous les rôles, utilisez `$roleNames`.
