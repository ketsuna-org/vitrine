---
layout: doc
title: $getMentionableSelectUserID
translation_key: docs
category: "Entity Info"
function_name: getMentionableSelectUserID
syntax: $getMentionableSelectUserID[(index)]
description: Gets the ID of the entité mentionnable (user or role) selectede via un menu of sélection mentionnable (mentionable select).
---

# $getMentionableSelectUserID

The function `$getMentionableSelectUserID[]` allows **récupérer the ID of the entité mentionnable** selectede par the user via un menu of sélection mentionnable (users + roles).

## Syntax

```
$getMentionableSelectUserID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - L'index of l'entité in the sélection (1 = first). Par default 1. |

## Return Value

- **Type** : String (Snowflake ID)
- The ID Discord of the user or of the role selected.
- String vide si no mentionnable n'was selected.

## Behavior

- Utilisé in thes interactions with a menu of type `mentionable`.
- Le menu mentionnable accepte to la fois users and roles.
- The ID retourné can be un ID user or un ID of role according to ce que the user a choisi.

## Examples

### Récupération simple

```bdfd
$nominalTrigger
$addMentionableSelectMenu[mention_select;1;Choisissez un user or role]
$sendMessage[Sélectionnez une entité :]

$onInteraction[mention_select]
$let[id;$getMentionableSelectUserID]
$title[Entité selectede]
$description[ID : $id]
$sendMessage[]
```

### Vérification of the type of entité

```bdfd
$onInteraction[mention_select]
$let[id;$getMentionableSelectUserID]
$if[$hasRole[$id;$guildID]==true]
  Il s'agit of a role : @&$id
$else
  Il s'agit of a user : <@$id>
$endif
```

## Notes

- L'index commence to 1.
- Pour les sélections multiple, use `$getMentionableSelectUserIDs[]`.
- The ID retourné peut correspondre to un user OU un role.
