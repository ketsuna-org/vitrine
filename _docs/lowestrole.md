---
layout: doc
title: $lowestRole
translation_key: docs
category: "Entity Info"
function_name: lowestRole
syntax: $lowestRole
description: Retourne l'ID du rôle le plus bas (hiérarchiquement) de l'utilisateur sur le serveur (hors @everyone).
---

# $lowestRole

La variable `$lowestRole` retourne l'**ID du rôle le plus bas** dans la hiérarchie des rôles de l'utilisateur sur le serveur (en excluant généralement `@everyone`).

## Syntaxe

```
$lowestRole
```

## Valeur de retour

- **Type** : Snowflake (chaîne numérique)
- L'ID du rôle le plus bas de l'utilisateur (hors `@everyone`)

## Comportement

- `$lowestRole` ne prend **aucun argument**.
- Retourne le rôle non-`@everyone` le plus bas dans la hiérarchie.
- Si l'utilisateur n'a qu'un seul rôle (ou seulement `@everyone`), le comportement peut varier.

## Exemples

### Lister la hiérarchie complète

```bdfd
$title[Hiérarchie des rôles]
$description[
**Utilisateur :** $userName
**Rôle le plus haut :** $roleName[$highestRole]
**Rôle le plus bas :** $roleName[$lowestRole]
]
$color[#5865F2]
$sendMessage[]
```

### Vérifier le rôle le plus bas

```bdfd
$sendMessage[Votre rôle le plus bas est : $roleName[$lowestRole] (ID: $lowestRole)]
```

## Notes

- `$lowestRole` exclut généralement le rôle `@everyone`.
- La hiérarchie des rôles est définie dans les paramètres du serveur.
- Pour obtenir un rôle avec des permissions spécifiques, utilisez `$lowestRoleWithPerms[]`.
