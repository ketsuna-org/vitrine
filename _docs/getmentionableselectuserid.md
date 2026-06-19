---
layout: doc
title: $getMentionableSelectUserID
translation_key: docs
category: "Entity Info"
function_name: getMentionableSelectUserID
syntax: $getMentionableSelectUserID[(index)]
description: Récupère l'ID de l'entité mentionnable (utilisateur ou rôle) sélectionnée via un menu de sélection mentionnable (mentionable select).
parameters:
  - name: index
    description: (Optionnel) L'index de l'entité sélectionnée. Par défaut 1 (première entité).
returns:
  - type: string
    description: L'ID de l'utilisateur ou du rôle sélectionné, ou une chaîne vide si aucune sélection.
related:
  - $getMentionableSelectUserIDs
  - $getUserSelectUserID
  - $getRoleSelectRoleID
  - $getChannelSelectChannelID
examples:
  - description: Récupérer le premier mentionnable
    code: $getMentionableSelectUserID
  - description: Récupérer le 3ème
    code: $getMentionableSelectUserID[3]
---

# $getMentionableSelectUserID

La fonction `$getMentionableSelectUserID[]` permet de **récupérer l'ID de l'entité mentionnable** sélectionnée par l'utilisateur via un menu de sélection mentionnable (utilisateurs + rôles).

## Syntaxe

```
$getMentionableSelectUserID[(index)]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `index` | Optionnel - L'index de l'entité dans la sélection (1 = premier). Par défaut 1. |

## Valeur de retour

- **Type** : String (Snowflake ID)
- L'ID Discord de l'utilisateur ou du rôle sélectionné.
- Chaîne vide si aucun mentionnable n'a été sélectionné.

## Comportement

- Utilisé dans les interactions avec un menu de type `mentionable`.
- Le menu mentionnable accepte à la fois des utilisateurs et des rôles.
- L'ID retourné peut être un ID utilisateur ou un ID de rôle selon ce que l'utilisateur a choisi.

## Exemples

### Récupération simple

```bdfd
$nominalTrigger
$addMentionableSelectMenu[mention_select;1;Choisissez un utilisateur ou rôle]
$sendMessage[Sélectionnez une entité :]

$onInteraction[mention_select]
$let[id;$getMentionableSelectUserID]
$title[Entité sélectionnée]
$description[ID : $id]
$sendMessage[]
```

### Vérification du type d'entité

```bdfd
$onInteraction[mention_select]
$let[id;$getMentionableSelectUserID]
$if[$hasRole[$id;$guildID]==true]
  Il s'agit d'un rôle : @&$id
$else
  Il s'agit d'un utilisateur : <@$id>
$endif
```

## Notes

- L'index commence à 1.
- Pour les sélections multiples, utiliser `$getMentionableSelectUserIDs[]`.
- L'ID retourné peut correspondre à un utilisateur OU un rôle.
