---
layout: doc
title: $roleID
translation_key: docs
category: "Entity Info"
function_name: roleID
syntax: $roleID[name;(guildID)]
description: Retourne l'ID d'un rôle Discord à partir de son nom ou d'une mention. Insensible à la casse.
parameters:
  - name: name
    description: Le nom du rôle (ou mention) à rechercher.
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: snowflake (string)
    description: L'ID du rôle trouvé, ou une chaîne vide si aucun.
related:
  - $roleName
  - $roleExists
  - $findRole
  - $getRole
examples:
  - description: ID d'un rôle par nom
    code: $sendMessage[ID Admin : $roleID[Admin]]
  - description: ID d'un rôle par mention
    code: $sendMessage[ID rôle : $roleID[<@&123456789012345678>]]
  - description: ID dans un autre serveur
    code: $sendMessage[ID rôle : $roleID[Admin;123456789012345678]]
---

# $roleID

La fonction `$roleID` retourne l'**ID** d'un rôle Discord à partir de son **nom** ou d'une **mention**. La recherche est insensible à la casse.

## Syntaxe

```
$roleID[name;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `name` | Le nom du rôle ou une mention brute (`<@&id>`). |
| `guildID` | Optionnel. L'ID du serveur cible. Si omis, le serveur courant. |

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID du rôle, ou `""` si introuvable. |

## Exemples

### Obtenir l'ID d'un rôle

```bdfd
$sendMessage[ID du rôle Admin : $roleID[Admin]]
```

### Vérifier si un rôle existe

```bdfd
$if[$roleID[Membre]!=]
  $sendMessage[Le rôle Membre existe !]
$else
  $sendMessage[Rôle Membre introuvable.]
$endif
```

### À partir d'une mention

```bdfd
$sendMessage[ID extrait de la mention : $roleID[<@&123456789012345678>]]
```

### Dans un autre serveur

```bdfd
$sendMessage[ID rôle sur autre serveur : $roleID[Modo;987654321098765432]]
```

## Notes

- Si plusieurs rôles portent le même nom, seul le premier trouvé est retourné.
- La mention brute (`<@&id>`) est acceptée comme paramètre.
- Utilisez `$findRole` pour une recherche par nom partiel.
