---
layout: doc
title: $getRole
translation_key: docs
category: "Entity Info"
function_name: getRole
syntax: $getRole[userID;index;(guildID)]
description: Retourne l'ID d'un rôle d'un utilisateur selon son index (position) dans la liste des rôles du membre.
parameters:
  - name: userID
    description: L'ID de l'utilisateur cible.
  - name: index
    description: "L'index du rôle (1 = rôle le plus haut, 2 = deuxième, etc.)."
  - name: guildID
    description: "Optionnel. L'ID du serveur cible. Si omis, utilise le serveur courant."
returns:
  - type: snowflake (string)
    description: L'ID du rôle à l'index spécifié, ou chaîne vide si l'index dépasse le nombre de rôles.
related:
  - $roleID
  - $roleName
  - $roleColor
  - $colorRole
  - $usersWithRole
examples:
  - description: Premier rôle de l'auteur
    code: $sendMessage[Votre plus haut rôle : $roleName[$getRole[$authorID;1]]]
  - description: Vérifier si un utilisateur a un rôle
    code: |
      $if[$getRole[$authorID;1]==$roleID[Admin]]
        $sendMessage[Vous êtes administrateur.]
      $endif
  - description: Lister tous les rôles d'un utilisateur
    code: $sendMessage[Tous vos rôles : ...]
---

# $getRole

La fonction `$getRole` retourne l'**ID d'un rôle** d'un utilisateur en fonction de sa **position** dans sa liste de rôles. L'index `1` correspond au rôle le plus élevé hiérarchiquement, `2` au deuxième, et ainsi de suite.

## Syntaxe

```
$getRole[userID;index;(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | L'ID de l'utilisateur. Obligatoire. |
| `index` | La position du rôle (1 = plus haut, 2 = deuxième...). Obligatoire. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

| Type | Description |
|---|---|
| `snowflake` (string) | L'ID du rôle à la position donnée, ou `""` si l'index est invalide. |

## Exemples

### Rôle le plus élevé

```bdfd
$sendMessage[Votre rôle le plus haut : $roleName[$getRole[$authorID;1]]]
```

### Vérifier si admin

```bdfd
$if[$getRole[$authorID;1]==$roleID[Admin]]
  $sendMessage[Vous êtes administrateur !]
$else
  $sendMessage[Vous n'êtes pas administrateur.]
$endif
```

### Rôle secondaire

```bdfd
$sendMessage[Votre deuxième rôle : $roleName[$getRole[$authorID;2]]]
```

### Couleur du rôle principal

```bdfd
$title[Profil]
$description[Couleur de votre rôle principal]
$color[$roleColor[$getRole[$authorID;1]]]
$sendMessage[]
```

### Rôle d'un autre utilisateur

```bdfd
$sendMessage[Rôle principal de <@$mentioned[1]> : $roleName[$getRole[$mentioned[1];1]]]
```

## Notes

- L'index commence à `1` (pas `0`).
- Si l'utilisateur n'a pas de rôle (seulement @everyone), `$getRole` peut retourner une chaîne vide.
- Pour obtenir la couleur du rôle le plus haut, utilisez directement `$colorRole[$userID]`.
- Pour lister tous les rôles d'un utilisateur, itérez avec une boucle.
