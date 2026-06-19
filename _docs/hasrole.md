---
layout: doc
title: $hasRole
translation_key: docs
category: "Math & Text"
function_name: hasRole
syntax: $hasRole[userID;roleID]
description: Vérifie si un utilisateur possède un rôle spécifique sur le serveur.
---

# $hasRole

La fonction `$hasRole[userID;roleID]` **vérifie si un utilisateur possède un rôle spécifique** sur le serveur. Elle est couramment utilisée pour les systèmes de permission.

## Syntaxe

```
$hasRole[userID;roleID]
```

Ou avec un seul paramètre (vérifie l'auteur) :

```
$hasRole[roleID]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | Optionnel - L'ID de l'utilisateur. Défaut : auteur de la commande. |
| `roleID` | L'ID du rôle à vérifier. Obligatoire. |

## Valeur de retour

- **Type** : Booléen
- `true` si l'utilisateur possède le rôle.
- `false` si le rôle n'est pas attribué, n'existe pas, ou si l'utilisateur est introuvable.

## Comportement

- Vérifie dans la liste des rôles de l'utilisateur sur le serveur courant.
- Fonctionne uniquement dans un contexte de serveur.
- Insensible à la casse du nom de rôle (si `$roleID[Nom]` est utilisé).

## Exemples

### Portail administrateur

```bdfd
$if[$hasRole[$authorID;$roleID[Admin]]==true]
  $title[🔧 Panneau Admin]
  $description[
  Commandes disponibles :
  - `!ban <user>` - Bannir un membre
  - `!kick <user>` - Expulser un membre
  - `!warn <user> <raison>` - Avertir
  ]
  $sendMessage[]
$else
  $sendEphemeral[❌ Accès réservé aux Administrateurs.]
$endif
```

### Commande de staff

```bdfd
$if[$hasRole[$roleID[Staff]]==false]
  $sendMessage[❌ Permission refusée. Rôle Staff requis.]
  $stop
$endif

;; Commande exécutée
$ban[$mentioned[1];Banni par $userName]
$sendMessage[🔨 <@$mentioned[1]> a été banni.]
```

### Vérification multi-rôles

```bdfd
$if[$hasRole[$mentioned[1];$roleID[Modo]]==true]
  $sendMessage[<@$mentioned[1]> est Modérateur.]
$elseif[$hasRole[$mentioned[1];$roleID[Admin]]==true]
  $sendMessage[<@$mentioned[1]> est Administrateur.]
$else
  $sendMessage[<@$mentioned[1]> est un membre standard.]
$endif
```

### Badge de rôle

```bdfd
$if[$hasRole[$roleID[VIP]]==true]
  $var[badge;👑 VIP]
$elseif[$hasRole[$roleID[Booster]]==true]
  $var[badge;🚀 Booster]
$else
  $var[badge;👤 Membre]
$endif

$sendMessage[$var[badge] $userName]
```

## Notes

- `$hasRole[userID;roleID]` requiert que le bot puisse voir les rôles du serveur.
- Pour attribuer un rôle, utilisez `$giveRole[]` ou `$giveRoles[]`.
- Pour retirer un rôle, utilisez `$takeRole[]` ou `$takeRoles[]`.
- `$hasRole` est souvent utilisé comme garde en début de commande avec `$stop`.
