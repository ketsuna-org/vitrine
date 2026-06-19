---
layout: doc
title: $userInfo
translation_key: docs
category: "Entity Info"
function_name: userInfo
syntax: $userInfo[userID;(property)]
description: Returns a JSON object contenant les informations of a user, or une property spécifique si demandée.
---

# $userInfo

The function `$userInfo[]` retourne un **JSON object** contenant les informations détaillées of a user Discord, or une property spécifique extractede de cet object.

## Syntax

```
$userInfo[userID;(property)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The ID of the user cible. Si omis, utilise the user déclencheur. |
| `property` | Optional. The name d'une property à extraire de l'JSON object. Si omis, retourne l'object complete. |

## Return Value

- **Type** : JSON object or string selon la property demandée
- Propertys availables : `id`, `username`, `discriminator`, `avatar`, `bot`, `system`, `banner`, `accent_color`, `global_name`, `display_name`, `public_flags`

## Examples

### Obtenir l'JSON object complete

```bdfd
$sendMessage[```json
$userInfo
```]
```

### Extraire the name global of a user

```bdfd
$title[Recherche user]
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

- `$userInfo[]` fournit un accès unifié à all propertys of a user.
- Les propertys availables sont les mêmes que celles de l'API Discord User Object.
- Utile for the intégrations avancées nécessitant des datas structurées.
