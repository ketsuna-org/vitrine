---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $addMentionableSelect

Creates a select menu d'entités mentionnables. Allows users to choisir parmi users ET les roles of the server.

## Syntax

```
$addMentionableSelect[customId;placeholder;(minValues);(maxValues);(disabled)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `customId` | Custom identifier for the interaction | Yes |
| `placeholder` | Text displayed when rien n'est selectionné | Yes |
| `minValues` | Minimum number of entities à selectionner (default: 1) | No |
| `maxValues` | Maximum number of entities à selectionner (default: 1) | No |
| `disabled` | `true` to disable le menu, `false` (default) | No |

## Description

A **mentionable select** combine la selection d'users and de roles en a single menu. The user peut choisir either des members or of roles of the server.

The values retournées sont of IDs. Use `$roleExists` to determine if a ID correspond à a role or à a user.

## Examples

### Selection simple

```
$addMentionableSelect[menu_mention;Choisissez un member or a role]
$sendMessage[Selectionnez une cible]
```

### Selection multiple

```
$addMentionableSelect[menu_targets;Cibles multiple;1;10]
$sendMessage[Selectionnez up to 10 cibles]
```

### Disabled menu

```
$addMentionableSelect[menu_mention_off;Inavailable;1;1;true]
$sendMessage[Menu désenabled]
```

## Handling the interaction

```
$onInteraction
$if[$customID==menu_mention]
  $if[$roleExists[$message]==true]
    $sendMessage[Role selectionné : <@&$message>]
  $else
    $sendMessage[User selectionné : <@$message>]
  $endif
$endif
```

## Difference from UserSelect and RoleSelect

| Function | Selectionne |
|----------|-------------|
| `$addUserSelect` | Only of users |
| `$addRoleSelect` | Only of roles |
| `$addMentionableSelect` | Users ET roles |

## Notes

- Pratique for commands de modération, giveaway, or systèmes de permission.
- Use `$roleExists` to distinguish roles and users in thes values retournées.
- A single select menu par action row.
