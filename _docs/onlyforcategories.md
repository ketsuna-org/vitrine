---
layout: doc
title: $onlyForCategories
translation_key: docs
category: "Moderation"
function_name: onlyForCategories
syntax: $onlyForCategories[categoryID1;categoryID2;...;(errorMessage)]
description: Function guard qui stops l'exécution if the channel courant n'appartient pas to l'une catégories spécifiées.
---

# $onlyForCategories

The function guard `$onlyForCategories` vérifie que le channel où the command est executed appartient to l'une catégories Discord spécifiées. Si le channel ne fait pas partie catégories allowedes, the command est interrompue.

## Syntax

```
$onlyForCategories[categoryID1;categoryID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `categoryID1;categoryID2;...` | Snowflake[] | IDs catégories allowedes. |
| `errorMessage` | String (optional) | Message if the channel n'appartient pas to the catégories allowedes. |

## Behavior

- Gets the ID of the catégorie parente of the channel courant via `$channelCategoryID`.
- Compare cette catégorie with the list fournie.
- Si la catégorie correspond, the command continue ; otherwise, it is interrompue.
- Si le channel n'a pas of catégorie parente, the command est toudays interrompue.

## Examples

### Catégorie Tickets

```bdfd
$onlyForCategories[123456789012345678;❌ Uniquement available in thes channels of tickets.]
$closeTicket
```

### Catégories Modération + Staff

```bdfd
$onlyForCategories[111111111111111111;222222222222222222;❌ Hors zone allowede.]
$clear[50]
```

### Sans error message

```bdfd
$onlyForCategories[123456789012345678]
$sendMessage[Function allowede in cette catégorie.]
```

## Notes

- Une catégorie Discord est un container of channels. Utilisez le Mode Développeur pour copier son ID.
- `$onlyForCategories` est plus large que `$onlyForChannels` : il autorise all channels of une catégorie entière.
- Pour les channels without catégorie, the command sera toudays bloquée.
- Combinez with `$onlyForChannels` pour règles plus granulaires (catégorie + channels specifics).
