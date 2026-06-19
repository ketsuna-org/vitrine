---
layout: doc
title: $userInfo
translation_key: docs
category: "Entity Info"
function_name: userInfo
syntax: $userInfo[userID;(property)]
description: Retourne un objet JSON contenant les informations d'un utilisateur, ou une propriété spécifique si demandée.
parameters:
  - name: userID
    description: L'ID de l'utilisateur cible (optionnel, défaut : utilisateur déclencheur).
  - name: property
    description: "Optionnel. Nom de la propriété à extraire (ex: \"username\", \"id\", \"bot\", \"avatar\"). Si omis, retourne l'objet JSON complet."
returns:
  - type: object/string
    description: Objet JSON des informations utilisateur, ou la valeur de la propriété demandée.
related:
  - $userID
  - $userName
  - $isBot
examples:
  - description: Obtenir toutes les infos utilisateur en JSON
    code: $userInfo
  - description: Obtenir le nom d'un utilisateur par ID
    code: $userInfo[123456789012345678;username]
  - description: Vérifier si un utilisateur est un bot
    code: $userInfo[$mentioned;bot]
---

# $userInfo

La fonction `$userInfo[]` retourne un **objet JSON** contenant les informations détaillées d'un utilisateur Discord, ou une propriété spécifique extraite de cet objet.

## Syntaxe

```
$userInfo[userID;(property)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `userID` | Optionnel. L'ID de l'utilisateur cible. Si omis, utilise l'utilisateur déclencheur. |
| `property` | Optionnel. Le nom d'une propriété à extraire de l'objet JSON. Si omis, retourne l'objet complet. |

## Valeur de retour

- **Type** : Objet JSON ou chaîne selon la propriété demandée
- Propriétés disponibles : `id`, `username`, `discriminator`, `avatar`, `bot`, `system`, `banner`, `accent_color`, `global_name`, `display_name`, `public_flags`

## Exemples

### Obtenir l'objet JSON complet

```bdfd
$sendMessage[```json
$userInfo
```]
```

### Extraire le nom global d'un utilisateur

```bdfd
$title[Recherche utilisateur]
$description[
**ID :** $mentioned
**Nom global :** $userInfo[$mentioned;global_name]
**Est un bot :** $userInfo[$mentioned;bot]
]
$color[#5865F2]
$sendMessage[]
```

### Utiliser avec JSON

```bdfd
$let[info;$userInfo]
$let[name;$jsonParse[$info;username]]
$sendMessage[Nom : $name]
```

## Notes

- `$userInfo[]` fournit un accès unifié à toutes les propriétés d'un utilisateur.
- Les propriétés disponibles sont les mêmes que celles de l'API Discord User Object.
- Utile pour les intégrations avancées nécessitant des données structurées.
