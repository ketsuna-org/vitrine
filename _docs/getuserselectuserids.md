---
layout: doc
title: $getUserSelectUserIDs
translation_key: docs
category: "Entity Info"
function_name: getUserSelectUserIDs
syntax: $getUserSelectUserIDs[(separator)]
description: Récupère tous les IDs des utilisateurs sélectionnés via un menu de sélection d'utilisateurs à choix multiples.
parameters:
  - name: separator
    description: (Optionnel) Le séparateur entre les IDs. Par défaut ", ".
returns:
  - type: string
    description: La liste des IDs des utilisateurs sélectionnés, séparés par le délimiteur.
related:
  - $getUserSelectUserID
  - $getRoleSelectRoleIDs
  - $getChannelSelectChannelIDs
examples:
  - description: Tous les utilisateurs (virgule)
    code: $getUserSelectUserIDs[, ]
  - description: Avec séparateur personnalisé
    code: $getUserSelectUserIDs[ | ]
---

# $getUserSelectUserIDs

La fonction `$getUserSelectUserIDs[]` permet de **récupérer l'ensemble des IDs des utilisateurs** sélectionnés dans un menu de sélection d'utilisateurs à choix multiples.

## Syntaxe

```
$getUserSelectUserIDs[(separator)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `separator` | Optionnel - Le séparateur entre chaque ID. Par défaut `, ` (virgule + espace). |

## Valeur de retour

- **Type** : String
- La liste de tous les IDs des utilisateurs sélectionnés.
- Chaîne vide si aucun utilisateur n'a été sélectionné.

## Comportement

- Utilisé avec un menu de sélection d'utilisateurs configuré avec `maxValues > 1`.
- Retourne tous les IDs en une seule chaîne.
- Idéal pour les actions de masse (DM groupés, attribution de rôles, etc.).

## Exemples

### DM groupé

```bdfd
$onInteraction[user_select]
$let[users;$getUserSelectUserIDs[,]]

$textSplit[$users;,]
  $sendDM[$splitText[$index];📢 Message important de **$serverName** !]
$endTextSplit

$title[✅ Messages envoyés]
$description[Tous les utilisateurs sélectionnés ont reçu un DM.]
$color[#57F287]
$sendMessage[]
```

### Attribution de rôle groupée

```bdfd
$onInteraction[user_select]
$let[users;$getUserSelectUserIDs[,]]
$let[count;$length[$splitText[$users;,]]]

$textSplit[$users;,]
  $giveRole[$splitText[$index];$roleID[Member]]
$endTextSplit

$title[🎭 Rôle attribué]
$description[Le rôle **Membre** a été donné à **$count** utilisateur(s).]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Pour une sélection unique, utilisez `$getUserSelectUserID[]`.
- Compatible avec `$textSplit[]` pour itérer sur chaque utilisateur.
- Utile pour les commandes de modération ou d'administration en lot.
