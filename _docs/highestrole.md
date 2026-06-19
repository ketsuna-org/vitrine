---
layout: doc
title: $highestRole
translation_key: docs
category: "Entity Info"
function_name: highestRole
syntax: $highestRole
description: Retourne l'ID du rôle le plus haut (hiérarchiquement) de l'utilisateur sur le serveur.
---

# $highestRole

La variable `$highestRole` retourne l'**ID du rôle le plus élevé** dans la hiérarchie des rôles de l'utilisateur sur le serveur.

## Syntaxe

```
$highestRole
```

## Valeur de retour

- **Type** : Snowflake (chaîne numérique)
- L'ID du rôle le plus haut de l'utilisateur
- Inclut `@everyone` si l'utilisateur n'a aucun autre rôle

## Comportement

- `$highestRole` ne prend **aucun argument**.
- La hiérarchie est déterminée par la position des rôles dans les paramètres du serveur Discord.
- Si l'utilisateur a plusieurs rôles, retourne celui qui est le plus haut dans la liste.

## Exemples

### Afficher le rôle principal

```bdfd
$title[Profil de $userName]
$author[$userName;$userAvatar]
$description[
**Rôle le plus haut :** <@&$highestRole>
**Nom du rôle :** $roleName[$highestRole]
]
$color[$roleColor[$highestRole]]
$sendMessage[]
```

### Vérifier la hiérarchie

```bdfd
$if[$highestRole==123456789012345678]
  $sendMessage[Vous êtes membre du staff !]
$else
  $sendMessage[Rôle principal : $roleName[$highestRole]]
$endif
```

### Comparaison de rôles

```bdfd
$let[modRole;123456789012345678]
$if[$rolePosition[$highestRole]>=$rolePosition[$modRole]]
  $sendMessage[Vous avez un rôle supérieur ou égal à Modérateur.]
$endif
```

## Notes

- L'ordre des rôles est défini dans les paramètres du serveur (Drag & Drop dans l'interface Discord).
- Le rôle `@everyone` est toujours le plus bas, sauf si des rôles sont placés en dessous (réorganisation manuelle).
- Pour le rôle le plus bas, utilisez `$lowestRole`.
- Utilisez `$roleName[$highestRole]` pour obtenir le nom du rôle.
