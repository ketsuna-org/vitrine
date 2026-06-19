---
layout: doc
title: $usersWithRole
translation_key: docs
category: "Entity Info"
function_name: usersWithRole
syntax: $usersWithRole[roleID;(separator);(guildID)]
description: Retourne la liste des membres ayant un rôle spécifique, séparés par un délimiteur.
---

# $usersWithRole

La fonction `$usersWithRole` retourne la **liste des membres** possédant un rôle spécifique sur le serveur.

## Syntaxe

```
$usersWithRole[roleID;(separator);(guildID)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `roleID` | L'ID du rôle. Obligatoire. |
| `separator` | Optionnel. Séparateur entre les membres. Par défaut : `, `. |
| `guildID` | Optionnel. L'ID du serveur cible. |

## Valeur de retour

| Type | Description |
|---|---|
| `string` | Liste des membres ayant le rôle (format dépend de la configuration). |

## Exemples

### Liste des admins

```bdfd
$sendMessage[**Administrateurs :** $usersWithRole[$roleID[Admin]]]
```

### Liste avec retours à la ligne

```bdfd
$sendMessage[
**Membres avec le rôle VIP :**
$usersWithRole[$roleID[VIP];
]]
```

### Compter les membres

```bdfd
$sendMessage[Il y a $length[$usersWithRole[$roleID[Membre];,]] membres avec le rôle Membre.]
```

### Vérifier si un rôle est vide

```bdfd
$if[$usersWithRole[$roleID[Ancien]]==]
  $sendMessage[Aucun membre n'a le rôle Ancien.]
$endif
```

### Notifier les admins

```bdfd
$sendMessage[$usersWithRole[$roleID[Admin]] Nouvelle alerte importante !]
```

## Notes

- Les membres sont généralement retournés sous forme de mentions.
- Le format exact peut varier selon la version de BDFD.
- Utile pour les annonces ciblées ou la gestion de communauté.
