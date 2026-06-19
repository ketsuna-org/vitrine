---
layout: doc
title: $userInfo
translation_key: docs
category: "Entity Info"
function_name: userInfo
syntax: $userInfo[userID;(property)]
description: Returns a JSON object contenant les information of a user, or une property specific si demandée.
---

# $userInfo

The function `$userInfo[]` retourne un **JSON object** contenant les information détaillées of a user Discord, or une property specific extractede of cet object.

## Syntax

```
$userInfo[userID;(property)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The ID of the user cible. Si omitted, utilise the user déclencheur. |
| `property` | Optional. The name of une property to extraire of l'JSON object. Si omitted, retourne l'object complete. |

## Return Value

- **Type** : JSON object or string according to the property demandée
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

### Use with JSON

```bdfd
$let[info;$userInfo]
$let[name;$jsonParse[$info;username]]
$sendMessage[Nom : $name]
```

## Notes

- `$userInfo[]` fournit un accès unifié to all propertys of a user.
- Les propertys availables sont les mêmes que celles of l'API Discord User Object.
- Utile for the intégrations avancées nécessitant datas structurées.
