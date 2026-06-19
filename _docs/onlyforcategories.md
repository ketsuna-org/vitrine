---
layout: doc
title: $onlyForCategories
translation_key: docs
category: "Moderation"
function_name: onlyForCategories
syntax: $onlyForCategories[categoryID1;categoryID2;...;(errorMessage)]
description: Fonction guard qui arrête l'exécution si le channel courant n'appartient pas à l'une des catégories spécifiées.
---

# $onlyForCategories

La fonction guard `$onlyForCategories` vérifie que le channel où la commande est exécutée appartient à l'une des catégories Discord spécifiées. Si le channel ne fait pas partie des catégories autorisées, la commande est interrompue.

## Syntaxe

```
$onlyForCategories[categoryID1;categoryID2;...;(errorMessage)]
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `categoryID1;categoryID2;...` | Snowflake[] | IDs des catégories autorisées. |
| `errorMessage` | String (optionnel) | Message si le channel n'appartient pas aux catégories autorisées. |

## Comportement

- Récupère l'ID de la catégorie parente du channel courant via `$channelCategoryID`.
- Compare cette catégorie avec la liste fournie.
- Si la catégorie correspond, la commande continue ; sinon, elle est interrompue.
- Si le channel n'a pas de catégorie parente, la commande est toujours interrompue.

## Exemples

### Catégorie Tickets

```bdfd
$onlyForCategories[123456789012345678;❌ Uniquement disponible dans les salons de tickets.]
$closeTicket
```

### Catégories Modération + Staff

```bdfd
$onlyForCategories[111111111111111111;222222222222222222;❌ Hors zone autorisée.]
$clear[50]
```

### Sans message d'erreur

```bdfd
$onlyForCategories[123456789012345678]
$sendMessage[Fonction autorisée dans cette catégorie.]
```

## Notes

- Une catégorie Discord est un conteneur de salons. Utilisez le Mode Développeur pour copier son ID.
- `$onlyForCategories` est plus large que `$onlyForChannels` : il autorise tous les salons d'une catégorie entière.
- Pour les salons sans catégorie, la commande sera toujours bloquée.
- Combinez avec `$onlyForChannels` pour des règles plus granulaires (catégorie + salons spécifiques).
